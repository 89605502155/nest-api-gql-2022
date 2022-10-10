import { IsNotEmpty, IsString, MinLength, IsBoolean, IsOptional } from 'class-validator';

export class FindByNameCompanyDto {
    @MinLength(3, { message: 'El nombre de la empresa es muy corto' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    isActive = true;

    @IsBoolean()
    @IsOptional()
    deleted = false;
}
