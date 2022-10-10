import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CompanyService } from '../services';
import { User } from '@/modules/user/entities';
import { CreateCompanyDto } from '../dtos';

export function CreateCompanyInterceptor() {
    @Injectable()
    class CreateCompanyInterceptor implements NestInterceptor {
        constructor(public readonly _companyService: CompanyService) {}
        intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
            const ctx = GqlExecutionContext.create(context);
            const input: CreateCompanyDto = ctx.getArgs().inputCom;
            return next.handle().pipe(
                tap(async (res: User) => {
                    input.userId = await res.id;
                    await this._companyService.createCompany(input);
                    return res;
                }),
            );
        }
    }
    const Interceptor = mixin(CreateCompanyInterceptor);
    return Interceptor;
}
