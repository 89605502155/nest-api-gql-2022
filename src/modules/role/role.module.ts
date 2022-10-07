import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repositories';
import { RoleResolver } from './resolvers';
import { RoleService } from './services';
//import { AuthModule } from '../auth';

@Module({
    imports: [TypeOrmModule.forFeature([RoleRepository])],
    providers: [RoleService, RoleResolver],
    // controllers: [RoleController],
    exports: [RoleService],
})
export class RoleModule {}
