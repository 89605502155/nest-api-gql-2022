import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class FindByEmailDto {
    @MinLength(5, { message: 'El correo electronico es muy corto' })
    @MaxLength(60, { message: 'El correo electronico es muy largo' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
