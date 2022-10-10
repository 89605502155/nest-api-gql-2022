import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Status } from '@/shared/enums';
import { Transform } from 'class-transformer';

export class SearchDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    isActive = true;

    @IsBoolean()
    @IsOptional()
    deleted = false;

    @Transform(({ value }) => {
        let dev: string;
        Object.keys(Status).map((item, key) => {
            key === value ? (dev = item) : '';
        });
        return dev;
    })
    @IsOptional()
    status: Status = Status.ACTIVE;
}
