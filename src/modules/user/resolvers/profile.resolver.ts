import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';
import { Profile } from '../entities';
import { ProfileService } from '../services';
//import { AuthGuard } from '../../auth/guards/';
import { User } from '../../user/entities';

@Resolver(() => Profile)
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {}

    //@UseGuards(AuthGuard)
    @Query(() => Profile, { nullable: true })
    async getProfileUserById(@Context('user') user: User): Promise<Profile> {
        return await this.profileService.getProfileUserById(user.id);
    }

    //@UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Profile, { nullable: true })
    async createProfileUser(@Context('user') user: User, @Args('input') input: CreateProfileUserDto): Promise<Profile> {
        return await this.profileService.createProfileUser(input);
    }

    //@UseGuards(AuthGuard)
    @Mutation(() => Profile)
    async updateProfileUser(@Context('user') user: User, @Args('input') input: UpdateProfileUserDto): Promise<Profile> {
        return await this.profileService.updateProfileUser(user.id, input);
    }
}
