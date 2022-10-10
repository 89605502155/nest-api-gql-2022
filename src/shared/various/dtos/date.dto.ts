import { IsNotEmpty, Matches } from 'class-validator';

export class DateDto {
    @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
    @IsNotEmpty()
    value: Date;
}
