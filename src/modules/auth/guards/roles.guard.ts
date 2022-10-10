import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../services';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<number[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.headers.authorization) {
            return false;
        }
        const user = await this.authService.validateToken(ctx.headers.authorization);
        const hasRole = () => roles.includes(user.roleId);
        if (!(user && hasRole())) {
            throw new HttpException('No tienes autorizacion para acceder..', HttpStatus.UNAUTHORIZED);
        }
        return true;
    }
}
