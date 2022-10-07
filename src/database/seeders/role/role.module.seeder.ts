import { Module } from '@nestjs/common';
import { RoleSeederService } from './role.service.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@/modules/role/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RoleSeederService],
    exports: [RoleSeederService],
})
export class RoleSeederModule {}
