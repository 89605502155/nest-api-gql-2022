import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CompanyService } from '../services';
import { User } from '@/modules/user/entities';
import { CreateCompanyDto } from '../dtos';

@Injectable()
export class CreateCompanyInterceptor implements NestInterceptor {
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
