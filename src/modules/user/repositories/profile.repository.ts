import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProfileUserDto, UpdateProfileUserDto } from '../dtos';
import { Profile } from '../entities';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
    async getProfileUserById(userId: number): Promise<Profile> {
        return await this.createQueryBuilder('profiles')
            .select()
            .where('profiles.userId = :userId', { userId })
            .getOne();
    }

    async existsProfile(userId: number): Promise<boolean> {
        const existsProfile = await this.createQueryBuilder('profiles')
            .select()
            .where('profiles.userId = :userId', { userId })
            .getOne();

        return !!existsProfile;
    }

    async createProfileUser(dto: CreateProfileUserDto): Promise<Profile> {
        const existsProfile = await this.existsProfile(dto.userId);
        if (existsProfile) {
            throw new BadRequestException(`The user already registered.`);
        }
        const newProfile = await this.create(dto);
        const profileSaved = await this.save(newProfile);
        return profileSaved[0];
    }

    async initialitationProfile(userId: number): Promise<boolean> {
        const newProfile = await this.create({ userId });
        const profileSaved = await this.save(newProfile);
        return !!profileSaved;
    }

    async updateProfileUser(userId: number, dto: UpdateProfileUserDto): Promise<Profile> {
        const profile = await this.createQueryBuilder('profiles')
            .select()
            .where('profiles.userId = :userId', { userId })
            .getOne();
        if (!profile) throw new BadRequestException(`The user already  not profile.`);
        const profileToUpdate = Object.assign(profile, dto);
        const profileUpdated = await this.save(profileToUpdate);
        return profileUpdated;
    }
}
