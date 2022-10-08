import { Module } from '@nestjs/common';
import { GraphQL } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database';
import { RoleModule } from './modules/role';
import { UserModule } from './modules/user';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), GraphQL, DatabaseModule, RoleModule, UserModule],
})
export class AppModule {
    static host: string;
    static port: number;

    constructor(private readonly configService: ConfigService) {
        AppModule.host = this.configService.get('HOST');
        AppModule.port = +this.configService.get('PORT');
    }
}
