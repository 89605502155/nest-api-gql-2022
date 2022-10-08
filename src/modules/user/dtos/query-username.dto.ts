import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class QueryUserEmailDto {
    @Field()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
