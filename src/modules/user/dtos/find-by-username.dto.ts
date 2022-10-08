import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class FindByUsernameDto {
    @MinLength(5, { message: 'username is too short' })
    @MaxLength(60, { message: 'username is too long' })
    @IsNotEmpty()
    @IsString()
    username: string;
}
