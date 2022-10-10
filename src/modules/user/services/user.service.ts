import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { UserRepository } from '../repositories';
import { CreateUserDto, UpdateUserDto, QueryUserEmailDto, FindByEmailDto } from '../dtos';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll();

        return users.map((user: User) => {
            return user;
        });
    }

    async getUserById(userId: number): Promise<User> {
        return await this.userRepository.findOneById(userId);
    }

    async getUserByCompanyId(companyId: number): Promise<User> {
        return await this.userRepository.getUserByCompanyId(companyId);
    }

    async findByEmail(dto: QueryUserEmailDto): Promise<boolean> {
        return await this.userRepository.findByEmail(dto);
    }

    async getUserByEmail(userEmail: string): Promise<User> {
        return await this.userRepository.findOneByEmail(userEmail);
    }

    async requestUserPassword(dto: FindByEmailDto): Promise<User> {
        return await this.userRepository.requestUserPassword(dto);
    }

    async findOneByEmailFace(userEmail: string): Promise<User> {
        return await this.userRepository.findOneByEmailFace(userEmail);
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(dto);
    }

    async createUserApp(dto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUserApp(dto);
    }

    async createUserAppFacebook(email: string, password: string): Promise<User> {
        return await this.userRepository.createUserAppFacebook(email, password);
    }

    async updateUser(userId: number, dto: UpdateUserDto): Promise<User> {
        return await this.userRepository.updateUser(userId, dto);
    }

    async deleteUser(userId: number): Promise<User> {
        return await this.userRepository.deleteUser(userId);
    }

    async activeUserByCompanyId(companyId: number): Promise<User> {
        return await this.userRepository.activeUserByCompanyId(companyId);
    }

    async inactiveUserByCompanyId(companyId: number): Promise<User> {
        return await this.userRepository.inactiveUserByCompanyId(companyId);
    }
}
