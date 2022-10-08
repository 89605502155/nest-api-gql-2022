import { Injectable } from '@nestjs/common';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';
import { Profile } from '../entities';
import { ProfileRepository } from '../repositories';

@Injectable()
export class ProfileService {
    constructor(private profileUserRepository: ProfileRepository) {}

    async getProfileUserById(userId: number): Promise<Profile> {
        return await this.profileUserRepository.getProfileUserById(userId);
    }

    async createProfileUser(dto: CreateProfileUserDto): Promise<Profile> {
        return await this.profileUserRepository.createProfileUser(dto);
    }

    async initialitationProfile(userId: number): Promise<boolean> {
        return await this.profileUserRepository.initialitationProfile(userId);
    }

    async updateProfileUser(id: number, dto: UpdateProfileUserDto): Promise<Profile> {
        return await this.profileUserRepository.updateProfileUser(id, dto);
    }
}
