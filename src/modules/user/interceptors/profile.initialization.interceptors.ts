import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProfileService } from '../services';
import { User } from '../entities';
import { CreateProfileUserDto } from '../dtos';

export function ProfileInitializationInterceptors() {
    @Injectable()
    class ProfileInitializationInterceptors implements NestInterceptor {
        constructor(public readonly profileService: ProfileService) {}
        intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
            const ctx = GqlExecutionContext.create(context);
            const input: CreateProfileUserDto = ctx.getArgs()?.inputPro;
            return next.handle().pipe(
                tap(async (res: User) => {
                    if (input && res) {
                        input.userId = res.id;
                        await this.profileService.createProfileUser(input);
                    } else if (res) {
                        await this.profileService.initialitationProfile(res.id);
                    }
                }),
            );
        }
    }
    const Interceptor = mixin(ProfileInitializationInterceptors);
    return Interceptor;
}
