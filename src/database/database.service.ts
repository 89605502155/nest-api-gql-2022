import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                type: config.get('DATABASE_TYPE'),
                host: config.get('DATABASE_HOST'),
                port: config.get('DATABASE_PORT'),
                database: config.get('DATABASE_NAME'),
                username: config.get('DATABASE_USER'),
                password: config.get('DATABASE_PASS'),
                timezone: config.get('DATABASE_TIMEZONE'),
                autoLoadEntities: !!config.get('DATABASE_AUTOLOADENTITIES'),
                synchronize: !!config.get('DATABASE_AUTOLOADENTITIES'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + config.get('DATABASE_MIGRATIONS_DIR') + '/*.{.ts,.js}'],
            } as ConnectionOptions;
        },
    }),
];
