import { CallHandler, ExecutionContext, Injectable, mixin, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '@/modules/user/services';

//export function ActiveUserByCompanyInterceptor() {
@Injectable()
export class ActiveUserByCompanyInterceptor implements NestInterceptor {
    constructor(public readonly _userService: UserService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const ctx = GqlExecutionContext.create(context);
        const { id } = ctx.getArgs();

        return next.handle().pipe(
            tap(async (res: boolean) => {
                if (res) {
                    await this._userService.activeUserByCompanyId(id);
                }
            }),
        );
    }
}
//  return mixin(ActiveUserByCompanyInterceptor);
//}
