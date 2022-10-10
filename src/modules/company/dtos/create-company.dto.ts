import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import {
    IsNotEmpty,
    IsBoolean,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    ValidationArguments,
    MinLength,
    IsInt,
} from 'class-validator';

export class CreateCompanyDto {
    @MinLength(5, { message: 'El nombre es muy corto' })
    @MaxLength(50, { message: 'El nombre es muy largo' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @MaxLength(150, { message: 'La descripcion es muy larga' })
    @IsOptional()
    description: string;

    @MaxLength(100, { message: 'La direccion es muy larga' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @MaxLength(50, { message: 'La ciudad es muy larga' })
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString({ message: 'Debe ser un numero valido' })
    @IsPhoneNumber('CO', {
        message: (args: ValidationArguments) => {
            if (args.value.length !== 12) {
                throw new BadRequestException(`${args.value} Invalid MobilePhone Number`);
            } else {
                throw new InternalServerErrorException();
            }
        },
    })
    @IsNotEmpty({ message: 'el telefono debe ser ingresado' })
    phone: string;

    @MaxLength(240, { message: 'La url de la imagen es muy larga' })
    @IsOptional()
    image: string;

    @IsInt()
    @IsOptional()
    userId: number;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
