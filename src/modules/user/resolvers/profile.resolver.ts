import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';
import { Profile } from '../entities';
import { ProfileService } from '../services';
import { AuthGuard } from '../../auth/guards/';
import { IUserPayload } from '@/modules/auth/interfaces';

@Resolver(() => Profile)
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(AuthGuard)
    @Query(() => Profile, { nullable: true })
    async getProfileUserById(@Context('user') { id }: IUserPayload): Promise<Profile> {
        return await this.profileService.getProfileUserById(id);
    }

    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Profile, { nullable: true })
    async createProfileUser(@Args('input') input: CreateProfileUserDto): Promise<Profile> {
        return await this.profileService.createProfileUser(input);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Profile)
    async updateProfileUser(
        @Context('user') { id }: IUserPayload,
        @Args('input') input: UpdateProfileUserDto,
    ): Promise<Profile> {
        return await this.profileService.updateProfileUser(id, input);
    }
}
