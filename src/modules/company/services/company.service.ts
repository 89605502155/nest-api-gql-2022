import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories';
import { Company } from '../entities';
import { CreateCompanyDto, UpdateCompanyDto, QueryCompanyDto } from '../dtos';
import { PaginationArgs } from '../../../shared/various/dtos';
import { SearchDto } from '@/shared/various/dtos';

@Injectable()
export class CompanyService {
    constructor(private companyRepository: CompanyRepository) {}

    async getCompaniesAll(): Promise<Company[]> {
        return await this.companyRepository.getCompaniesAll();
    }

    async getCompanies(input: SearchDto, pagination: PaginationArgs): Promise<Company[]> {
        const { name = null } = input;
        if (name) {
            return await this.companyRepository.getCompanies(input, pagination);
        } else {
            return await this.companyRepository.findAllFilter(input, pagination);
        }
    }

    async getCompaniesByName(dto: SearchDto, pagination: PaginationArgs): Promise<Company[]> {
        return await this.companyRepository.getCompaniesByName(dto, pagination);
    }

    async getCompaniesByNameCount(dto: SearchDto): Promise<number> {
        return await this.companyRepository.getCompaniesByNameCount(dto);
    }

    async getCompaniesByUser(userId: number): Promise<Company> {
        return await this.companyRepository.getCompaniesByUser(userId);
    }

    async getCompaniesByCategory(dto: QueryCompanyDto, pagination: PaginationArgs): Promise<Company[]> {
        const { isActive = true } = dto;
        if (dto.categoryId) {
            return await this.companyRepository.getCompaniesByCategory(dto, pagination);
        }
        const input = new SearchDto();
        input.isActive = isActive;
        return await this.companyRepository.findAllFilter(input, pagination);
    }

    async getCompany(companyId: number): Promise<Company> {
        return await this.companyRepository.findOneById(companyId);
    }

    /*  async getCompaniesFollowByUser(userId: number): Promise<Company[]> {
        return await this.companyRepository.getCompaniesFollowByUser(userId);
    } */

    async createCompany(dto: CreateCompanyDto): Promise<Company> {
        return await this.companyRepository.createCompany(dto);
    }

    async updateCompany(companyId: number, dto: UpdateCompanyDto): Promise<Company> {
        return await this.companyRepository.updateCompany(companyId, dto);
    }

    async deleteCompany(companyId: number): Promise<Company> {
        return await this.companyRepository.deleteCompany(companyId);
    }

    async activeCompany(id: number): Promise<boolean> {
        return await this.companyRepository.activeCompany(id);
    }

    async disabledCompany(companyId: number): Promise<boolean> {
        return await this.companyRepository.disabledCompany(companyId);
    }
}
