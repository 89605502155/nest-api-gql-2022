import { IsString, IsNotEmpty } from 'class-validator';

export class Token {
    @IsString()
    @IsNotEmpty()
    access_token: string;
}
