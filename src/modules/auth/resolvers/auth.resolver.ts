import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../services';
import { User } from '../../user/entities';
import { AuthGuard, EditPasswordGuard } from '../guards';
import { CreateUserDto, UpdateProfileUserDto, UpdatePasswordDto } from '../../user/dtos';
import { IUserPayload } from '../interfaces';
import { Token, LoginUserDto } from '../dtos';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query()
    @UseGuards(AuthGuard)
    userCurrent(@Context('user') user: IUserPayload) {
        return user;
    }

    @Query()
    @UseGuards(AuthGuard)
    async userMobile(@Context('user') user: IUserPayload): Promise<IUserPayload> {
        return user;
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => User)
    async loginApp(@Args('input') { email, password }: LoginUserDto) {
        return await this.authService.validateUserGqlApp(email, password);
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => User)
    async loginWeb(@Args('input') { email, password }: LoginUserDto) {
        return await this.authService.validateUserGqlWeb(email, password);
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async createUserApp(@Args('input') input: CreateUserDto) {
        return await this.authService.createUserApp(input);
    }

    @UseGuards(AuthGuard)
    @UseGuards(EditPasswordGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async editPassword(
        @Context('user') { email }: IUserPayload,
        @Args('input') input: UpdatePasswordDto,
    ): Promise<Token> {
        return await this.authService.editPassword(email, input);
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async loginAppFbsdk(
        @Args('input') input: LoginUserDto,
        @Args('inputProfile') inputProfile: UpdateProfileUserDto,
    ) {
        return await this.authService.loginAppFbsdk(input, inputProfile);
    }
}
