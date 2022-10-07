import { Injectable, Logger } from '@nestjs/common';
import { RoleSeederService } from './role/role.service.seeder';

@Injectable()
export class SeederService {
    constructor(private readonly logger: Logger, private readonly roleSeederService: RoleSeederService) {}

    async seed() {
        await this.roles()
            .then((completed) => {
                this.logger.debug('Successfuly completed seeding roles...');
                Promise.resolve(completed);
            })
            .catch((error) => {
                this.logger.error('Failed seeding roles...');
                Promise.reject(error);
            });
    }

    async roles() {
        return await Promise.all(this.roleSeederService.createRoles())
            .then((createdRoles) => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of Roles created : ' +
                        createdRoles.filter((nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage).length,
                );
                return Promise.resolve(true);
            })
            .catch((error) => Promise.reject(error));
    }
}
