import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CompanyRepository } from '../company/repositories';
import { CompanyService } from '../company/services';
import { ProfileRepository, UserRepository } from '../user/repositories';
import { ProfileService, UserService } from '../user/services';
import { AuthService } from './services';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtStrategy, LocalStrategy } from './strategies';
import { RoleRepository } from '../role/repositories';
import { RoleService } from '../role/services';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './guards';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, CompanyRepository, ProfileRepository, RoleRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('JWT_SECRET'),
                signOptions: { expiresIn: '10d' },
            }),
        }),
    ],
    providers: [
        AuthService,
        UserService,
        RoleService,
        LocalStrategy,
        ProfileService,
        CompanyService,
        JwtStrategy,
        AuthResolver,
        {
            provide: APP_INTERCEPTOR,
            useClass: RolesGuard,
        },
    ],
    // controllers: [AuthController],
    exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
