import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '../role/repositories';
import { RoleService } from '../role/services';
import { UserRepository, ProfileRepository /*, UserDetailRepository */ } from './repositories';
import { UserResolver, ProfileResolver /*, UserDetailResolver */ } from './resolvers';
import { UserService, ProfileService /*, UserDetailService */ } from './services';
import { CompanyService } from '../company/services';
import { CompanyRepository } from '../company/repositories';
import { AuthModule } from '../auth';
/*     
    import { MailModule } from '../mail';
    import { FirebaseModule } from '@/modules/firebase'; */

@Module({
    imports: [
        AuthModule,
        /*    
        MailModule,
        FirebaseModule, */
        TypeOrmModule.forFeature([
            UserRepository,
            ProfileRepository,
            /*    
            UserDetailRepository, */
            RoleRepository,
            CompanyRepository,
        ]),
    ],
    providers: [
        UserService,
        UserResolver,
        ProfileService,
        RoleService,
        ProfileResolver,
        CompanyService,
        /* UserDetailService,
        UserDetailResolver,
         */
    ],
    exports: [UserService],
})
export class UserModule {}
