import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
    @MinLength(5, { message: 'El email es muy corto' })
    @MaxLength(60, { message: 'El email es muy largo' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8, { message: 'La contraseña es muy corta' })
    @MaxLength(240, { message: 'La contraseña es muy larga' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
