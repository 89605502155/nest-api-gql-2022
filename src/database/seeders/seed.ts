import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

(async function seedBootstrap(): Promise<void> {
    const app = await NestFactory.createApplicationContext(SeederModule);

    const logger = new Logger('Seeding');
    const seeder = app.get(SeederService);

    seeder
        .seed()
        .then((msg) => {
            console.log(msg);
            logger.log('Seeding complete!');
        })
        .finally(() => app.close())
        .catch((err) => {
            throw err;
        });
})();
