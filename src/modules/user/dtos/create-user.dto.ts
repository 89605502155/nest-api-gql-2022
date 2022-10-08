import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { Status } from '@/shared/enums';
import { RoleType } from '@/modules/role/enums';

export class CreateUserDto {
    @MinLength(5, { message: 'El username es muy corto' })
    @MaxLength(25, { message: 'El username es muy largo' })
    @IsString()
    @IsOptional()
    username: string;

    @MinLength(5, { message: 'El email es muy corto' })
    @MaxLength(60, { message: 'El email es muy largo' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8, { message: 'La contraseña es muy corta' })
    @MaxLength(60, { message: 'La contraseña es muy larga' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Transform(({ value }) => RoleType[value])
    @IsOptional()
    roleId: number;

    @Transform(({ value }) => Status[value])
    @IsOptional()
    status: Status;
}
