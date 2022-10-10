import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../services';
import { UpdatePasswordDto } from '@/modules/user/dtos';

@Injectable()
export class EditPasswordGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { password, newPassword }: UpdatePasswordDto = ctx.getArgs().input;
        if (password == newPassword) {
            throw new HttpException('La contraseña no deben ser iguales', HttpStatus.CONFLICT);
        }
        return true;
    }
}
