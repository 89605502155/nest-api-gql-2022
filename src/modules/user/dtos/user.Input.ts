import { Field, InputType } from '@nestjs/graphql';
import { Length, IsEmail, MinLength, MaxLength, IsNotEmpty, IsBoolean } from 'class-validator';

@InputType()
export class NewUserInput {
    @Field()
    @MinLength(5, { message: 'Title is too short' })
    @MaxLength(50, { message: 'Title is too long' })
    @IsNotEmpty()
    username: string;

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @MinLength(10, { message: 'Title is too short' })
    @MaxLength(50, { message: 'Title is too long' })
    @IsNotEmpty()
    password: string;
}

@InputType()
export class UserInput {
    @Field()
    @MinLength(5, { message: 'Title is too short' })
    @MaxLength(50, { message: 'Title is too long' })
    @IsNotEmpty()
    username: string;

    @Field()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50, { message: 'Title is too long' })
    email: string;

    @Field()
    @MinLength(10, { message: 'Title is too short' })
    @MaxLength(50, { message: 'Title is too long' })
    @IsNotEmpty()
    password: string;

    @Field()
    @IsBoolean()
    status: boolean;
}
