import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

export class ActivateRoleDto extends PartialType(CreateRoleDto) {}
