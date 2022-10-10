import { Status } from '@/shared/enums';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto, FindByEmailDto, QueryUserEmailDto, UpdateUserDto } from '../dtos';
import { User } from '../entities';
//import { Profile } from '../entities';
//import { Status } from '../../../shared/enums';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findAll(): Promise<User[]> {
        return await this.find();
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException('User is not exists');
        return user;
    }

    async findOneByUsername(username: string): Promise<User> {
        if (!username) throw new BadRequestException('username must be provided');
        const user = await this.createQueryBuilder('user').where('user.username = :username', { username }).getOne();
        if (!user) throw new NotFoundException('User is not exists');
        return user;
    }

    async getUserByCompanyId(companyId: number): Promise<User> {
        return await this.createQueryBuilder('user')
            .innerJoinAndSelect('companies', 'companies', 'companies.user_id = user.id AND companies.id = :companyId', {
                companyId,
            })
            .getOne();
    }

    async findOneByEmailFace(email: string): Promise<User> {
        const user = await this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();

        return user;
    }

    async findByEmail(dto: QueryUserEmailDto): Promise<boolean> {
        const existUser = await this.findOne({ email: dto.email });
        return !!existUser;
    }

    async findOneByEmail(email: string): Promise<User> {
        if (!email) throw new BadRequestException('An email must be provided');

        const user = await this.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .addSelect('user.password')
            .getOne();

        if (!user) throw new NotFoundException('User is not exists');

        return user;
    }

    async userExist(dto: FindByEmailDto): Promise<boolean> {
        const user = await this.createQueryBuilder('user')
            .select('user.email')
            .where('user.email = :email', { email: dto.email })
            .getOne();

        return !!user;
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userExist(dto);
        if (!dto.username) {
            dto.username = await this.createUsername(dto.email);
        }
        if (user) throw new BadRequestException('User is already registered');
        const newUser = this.create(dto);
        const userSaved = await this.save(newUser);
        delete (await userSaved).password;
        return userSaved;
    }

    async createUserApp(dto: CreateUserDto): Promise<User> {
        const userExist = await this.userExist(dto);
        if (userExist) throw new BadRequestException('User is already registered');
        const newUser = this.create(dto);
        const user = await this.save(newUser);
        /* delete (await user).password;
        await this.createQueryBuilder('profiles')
            .insert()
            .into(Profile)
            .values({
                userId: user.id,
            })
            .execute(); */
        return user;
    }

    async createUserAppFacebook(email: string, password: string): Promise<User> {
        const username = await this.createUsername(email);
        const newUser = this.create({ email, password, roleId: 4, status: Status.ACTIVE, username });
        const user = await this.save(newUser);
        /* await this.createQueryBuilder('profiles')
            .insert()
            .into(Profile)
            .values({
                userId: user.id,
            })
            .execute(); */
        return user;
    }

    async updateUser(userId: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOneById(userId);
        const userToUpdate = Object.assign(user, dto);
        const userUpdated = await this.save(userToUpdate);
        delete (await userUpdated).password;
        return userUpdated;
    }

    async activeUserByCompanyId(companyId: number): Promise<User> {
        const userToUpdate = await this.createQueryBuilder('user')
            .innerJoinAndSelect('companies', 'companies', 'companies.user_id = user.id AND companies.id = :companyId', {
                companyId,
            })
            .getOne();
        userToUpdate.status = Status.ACTIVE;
        const userUpdated = await this.save(userToUpdate);
        return userUpdated;
    }

    async inactiveUserByCompanyId(companyId: number): Promise<User> {
        const userToUpdate = await this.createQueryBuilder('user')
            .innerJoinAndSelect('companies', 'companies', 'companies.user_id = user.id AND companies.id = :companyId', {
                companyId,
            })
            .getOne();
        userToUpdate.status = Status.INACTIVE;
        const userUpdated = await this.save(userToUpdate);
        return userUpdated;
    }

    async requestUserPassword(dto: FindByEmailDto): Promise<User> {
        const { email } = dto;
        const user = await this.findOneByEmail(email);
        const password = await this.newPasswordRequest();
        user.password = password;
        await this.save(user);
        return user;
    }

    async deleteUser(userId: number): Promise<User> {
        const user = await this.findOneById(userId);
        const userDeleted = await this.remove(user);
        delete (await userDeleted).password;
        return userDeleted;
    }

    async createUsername(email: string): Promise<string> {
        const usermail = email.split('@');
        let username = usermail[0];
        username =
            username.length < 4
                ? username +
                  Math.random()
                      .toString(36)
                      .substring(8 - username.length)
                : username + Math.random().toString(36).substring(4);
        username = username.length > 24 ? username.substr(20) : username;
        return username;
    }

    async newPasswordRequest(): Promise<string> {
        return await Math.random().toString(36).substr(2, 8);
    }
}
