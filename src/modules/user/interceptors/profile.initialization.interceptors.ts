import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileService } from '../services';
import { User } from '../entities';

export function ProfileInitializationInterceptors() {
    @Injectable()
    class ProfileInitializationInterceptors implements NestInterceptor {
        constructor(public readonly profileService: ProfileService) {}
        intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
            return next.handle().pipe(
                map(async (res: User) => {
                    if (res) {
                        await this.profileService.initialitationProfile(res.id);
                    }
                    return res;
                }),
            );
        }
    }
    const Interceptor = mixin(ProfileInitializationInterceptors);
    return Interceptor;
}
