import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../enums/roletype.enum';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
