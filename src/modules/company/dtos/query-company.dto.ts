import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class QueryCompanyDto {
    @IsInt()
    @IsOptional()
    categoryId: number;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
