import { IsNotEmpty, IsInt } from 'class-validator';

export class JokerByIdDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}
