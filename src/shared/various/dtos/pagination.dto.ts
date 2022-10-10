import { IsInt, IsOptional } from 'class-validator';

export class PaginationArgs {
    @IsOptional()
    @IsInt()
    offset = 0;

    @IsOptional()
    @IsInt()
    limit = 10;
}
