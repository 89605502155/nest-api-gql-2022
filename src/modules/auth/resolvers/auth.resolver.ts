import { UsePipes, ValidationPipe, UseGuards, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../services';
import { LoginUserDto } from '../dtos';
import { User } from '../../user/entities';
import { AuthGuard } from '../guards';
import { CreateUserDto, UpdateProfileUserDto, UpdatePasswordDto } from '../../user/dtos';
import { IUserPayload } from '../interfaces';

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
    userMobile(@Context('user') user: User) {
        return user;
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => User)
    async loginApp(@Args('input') input: LoginUserDto) {
        const { email, password } = input;
        return await this.authService.validateUserGqlApp(email, password);
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => User)
    async loginWeb(@Args('input') input: LoginUserDto) {
        const { email, password } = input;
        return await this.authService.validateUserGqlWeb(email, password);
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async createUserApp(@Args('input') input: CreateUserDto) {
        return await this.authService.createUserApp(input);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    @Mutation(() => User, { nullable: true })
    public async editPassword(@Context('user') user: User, @Args('input') input: UpdatePasswordDto) {
        const { password, newPassword } = await input;
        if (password == newPassword) {
            throw new NotFoundException('La contraseña no deben ser iguales');
        }
        return await this.authService.editPassword(user.email, input);
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
