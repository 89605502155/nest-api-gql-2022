import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { Status } from '@/shared/enums';

export class CreateRoleDto {
    @MinLength(4, { message: 'El nombre es muy corto' })
    @MaxLength(60, { message: 'El nombre es muy largo' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(240, { message: 'La descripcion es muy larga' })
    @IsString()
    description: string;

    @Transform(({ value }) => {
        let dev: string;
        Object.keys(Status).map((item, key) => {
            key === value ? (dev = item) : '';
        });
        return dev;
    })
    @IsOptional()
    status: Status;
}
