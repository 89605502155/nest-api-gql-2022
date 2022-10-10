import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* import { ConfigService } from '../../config/config.service';
import { CategoryRepository } from '../category/repositories';
import { CategoryService } from '../category/services';
import { EmployeeRepository } from '../employee/repositories';
import { EmployeeService } from '../employee/services';
import { ServiceRepository } from '../service/repositories';
import { ServiceService } from '../service/services/service.service';
import { TimetableRepository } from '../timetable/repositories';
import { TimetableService } from '../timetable/services/timetable.service'; */
import { UserRepository } from '../user/repositories';
import { UserService } from '../user/services';
// import { CompanyController } from './controllers';
import {
    /*   CompanyCategoryRepository,
    CompanyFollowRepository,
    CompanyLocationRepository, */
    CompanyRepository,
} from './repositories';
import {
    /* CompanyCategoryResolver, CompanyFollowResolver, CompanyLocationResolver,  */
    CompanyResolver,
} from './resolvers';
import { /* CompanyCategoryService, CompanyFollowService, CompanyLocationService, */ CompanyService } from './services';
/* import { AuthModule } from '../auth';
import { MailModule } from '../mail';
import { UploadModule } from '../upload'; */

@Module({
    imports: [
        /* AuthModule,
        MailModule,
        UploadModule, */
        TypeOrmModule.forFeature([
            CompanyRepository,
            UserRepository,
            /*   ServiceRepository,
            CategoryRepository,
            CompanyFollowRepository,
            EmployeeRepository,
            CompanyCategoryRepository,
            CompanyLocationRepository,
            TimetableRepository, */
        ]),
    ],
    providers: [
        CompanyService,
        CompanyResolver,
        UserService,
        /* TimetableService,
        CompanyFollowService,
        CompanyCategoryResolver,
        CompanyLocationService,
        EmployeeService,
        CategoryService,
        CompanyCategoryService,
        CompanyLocationResolver,
        CompanyFollowResolver,
        ServiceService,
        ConfigService, */
    ],
    // controllers: [CompanyController],
    exports: [CompanyService /*, CompanyFollowService, CompanyLocationService */],
})
export class CompanyModule {}
