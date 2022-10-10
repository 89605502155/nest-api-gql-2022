import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleDto, UpdateRoleDto } from '../dtos';
import { Role } from '../entities';
import { RoleService } from '../services';
import { RolesGuard } from '../../auth/guards';
import { RoleType } from '../enums';
import { Roles } from '../decorators';

@UseGuards(RolesGuard)
@Resolver(() => Role)
export class RoleResolver {
    constructor(private readonly roleService: RoleService) {}

    @Roles(RoleType.SUPERUSER)
    @Query(() => [Role])
    async getRoles(): Promise<Role[]> {
        return this.roleService.getRoles();
    }

    @Roles(RoleType.SUPERUSER)
    @Query(() => Role, { nullable: false })
    async getRole(@Args('id') id: number): Promise<Role> {
        return this.roleService.getRole(id);
    }

    @Roles(RoleType.SUPERUSER)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Role)
    async createRole(@Args('input') input: CreateRoleDto): Promise<Role> {
        return await this.roleService.createRole(input);
    }

    @Roles(RoleType.SUPERUSER)
    @Mutation(() => Role)
    async updateRole(@Args('id') id: number, input: UpdateRoleDto): Promise<Role> {
        return await this.roleService.updateRole(id, input);
    }
}
