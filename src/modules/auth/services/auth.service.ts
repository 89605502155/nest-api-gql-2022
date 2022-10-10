import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { IUserPayload } from '../interfaces';
import { CompanyService } from '@/modules/company/services';
import { CreateUserDto } from '@/modules//user/dtos';
import { UserService, ProfileService } from '@/modules//user/services';
import { Token, LoginUserDto } from '../dtos';
import { UpdateProfileUserDto, UpdatePasswordDto, UpdateUserDto } from '@/modules/user/dtos';
import { RoleService } from '@/modules/role/services';
import { RoleType } from '@/modules/role/enums';
import { User } from '@/modules/user/entities';
import { Status } from '@/shared/enums';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService,
        private readonly jwtService: JwtService,
        private readonly companyService: CompanyService,
        private readonly roleService: RoleService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        const passwordHashed = await compare(password, user.password);

        if (user && passwordHashed) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: IUserPayload) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUserGqlApp(email: string, password: string): Promise<Token> {
        const user = await this.userService.getUserByEmail(email);
        await this.comparePassword(password, user.password);

        if (user && user.roleId !== RoleType.CUSTOMER) {
            throw new NotFoundException('El usuario no tiene permisos para la app');
        }

        return await this.payloadData(user);
    }

    async validateUserGqlWeb(email: string, password: string): Promise<Token> {
        const user = await this.userService.getUserByEmail(email);

        await this.comparePassword(password, user.password);

        if (user && user.roleId === RoleType.CUSTOMER) {
            throw new NotFoundException('El usuario no tiene permisos para la web');
        }

        return await this.payloadData(user);
    }

    async createUserApp(dto: CreateUserDto): Promise<Token> {
        const user = await this.userService.createUserApp(dto);
        return await this.payloadData(user);
    }

    async loginAppFbsdk(dto: LoginUserDto, profile: UpdateProfileUserDto): Promise<Token> {
        const { email, password } = dto;
        let user = await this.userService.findOneByEmailFace(email);
        if (!user) {
            user = await this.userService.createUserAppFacebook(email, password);
        }
        await this.profileService.updateProfileUser(user.id, profile);

        return await this.payloadData(user);
    }

    async editPassword(email: string, input: UpdatePasswordDto): Promise<Token> {
        const user = await this.userService.getUserByEmail(email);

        const { password, newPassword } = await input;

        await this.comparePassword(password, user.password);

        const updateUserDto = new UpdateUserDto();
        updateUserDto.password = newPassword;
        updateUserDto.email = user.email;

        const updateUser = await this.userService.updateUser(user.id, updateUserDto);

        return await this.payloadData(updateUser);
    }

    async comparePassword(password, userPassword) {
        const passwordHashed = await compare(password, userPassword);
        if (!passwordHashed) {
            throw new NotFoundException('La contraseña no coincide');
        }
    }

    async payloadData(user: User): Promise<Token> {
        if (user && user.status == Status.ACTIVE) {
            throw new NotFoundException('El usuario no se enceuntra ACTIVO');
        }
        let companyId: number;
        //const role = await this.roleService.getRole(user.roleId);
        if (user.roleId == RoleType.BUSINESS) {
            const company = await this.companyService.getCompaniesByUser(user.id);
            companyId = company.id;
        }
        const payload: IUserPayload = {
            email: user.email,
            id: user.id,
            username: user.username,
            roleId: user.roleId,
            status: user.status,
            companyId: companyId,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateToken(auth: string): Promise<IUserPayload> {
        const token = auth;
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}
