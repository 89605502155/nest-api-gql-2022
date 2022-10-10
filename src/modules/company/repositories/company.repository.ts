import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto, QueryCompanyDto, FindByNameCompanyDto } from '../dtos';
import { Company } from '../entities';
import { IsActive, Status } from '@/shared/enums';
import { SearchDto, PaginationArgs } from '@/shared/various/dtos';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
    async getCompaniesAll(): Promise<Company[]> {
        return await this.find();
    }

    async findAllFilter(input: SearchDto, pagination: PaginationArgs): Promise<Company[]> {
        const { isActive = IsActive.TRUE } = input;
        const { offset = 0, limit = 10 } = pagination;
        return this.createQueryBuilder('companies')
            .where('companies.is_active = :isActive', { isActive })
            .skip(offset)
            .take(limit)
            .getMany();
    }

    async getCompanies(input: SearchDto, pagination?: PaginationArgs): Promise<Company[]> {
        const { offset = 0, limit = 10 } = pagination;
        const { isActive = 1, name, status = Status.ACTIVE } = input;
        return await this.createQueryBuilder('companies')
            .innerJoinAndSelect('users', 'users', 'users.id = companies.user_id AND users.status = :status', {
                status,
            })
            .where('companies.is_active = :isActive', { isActive })
            .andWhere('LOWER(companies.name) like :name', { name })
            .skip(offset)
            .take(limit)
            .getMany();
    }

    async getCompaniesByCategory(dto: QueryCompanyDto, pagination: PaginationArgs): Promise<Company[]> {
        const { categoryId, isActive = IsActive.TRUE } = dto;
        const { offset = 0, limit = 10 } = pagination;
        return this.createQueryBuilder('companies')
            .innerJoinAndSelect('users', 'users', 'users.id = companies.user_id AND users.status = :status', {
                status: Status.ACTIVE,
            })
            .leftJoinAndSelect('companies_categories', 'companycategory', 'companycategory.companyId = companies.id')
            .where('companycategory.category_id = :categoryId AND companies.is_active = :isActive', {
                categoryId,
                isActive,
            })
            .skip(offset)
            .take(limit)
            .getMany();
    }

    async getCompaniesByName(dto: SearchDto, pagination: PaginationArgs): Promise<Company[]> {
        const { name, deleted, isActive, status } = dto;
        const { limit, offset } = pagination;
        const companies = await this.createQueryBuilder('companies')
            .innerJoinAndSelect('users', 'users', 'users.id = companies.user_id AND users.status = :status', {
                status,
            })
            .where('LOWER(companies.name) like :name', { name })
            .andWhere('companies.deleted = :deleted', { deleted })
            .andWhere('companies.is_active = :isActive', { isActive })
            .skip(offset)
            .take(limit)
            .getMany();
        return companies;
    }

    async getCompaniesByNameCount(dto: SearchDto): Promise<number> {
        const { name, deleted, isActive, status } = dto;
        return await this.createQueryBuilder('companies')
            .innerJoinAndSelect('users', 'users', 'users.id = companies.user_id AND users.status = :status', {
                status,
            })
            .where('LOWER(companies.name) like :name', { name: `%${name}%` })
            .andWhere('companies.deleted = :deleted', { deleted })
            .andWhere('companies.is_active = :isActive', { isActive })
            .getCount();
    }

    async findOneById(id: number): Promise<Company> {
        const company = await this.findOne(id);
        if (!company) throw new NotFoundException('No existe la empresa');
        return company;
    }

    async findOneByEmail(companyEmail: string): Promise<Company> {
        const company = await this.findOne(companyEmail);
        if (!company) throw new NotFoundException('No existe la empresa');
        return company;
    }

    async getCompaniesByUser(userId: number): Promise<Company> {
        return await this.createQueryBuilder('companies').where('companies.user_id = :userId', { userId }).getOne();
    }

    /*  async getCompaniesFollowByUser(userId: number): Promise<Company[]> {
        return await this.createQueryBuilder('companies')
            .innerJoinAndSelect('users', 'users', 'users.id = companies.user_id AND users.status = :status', {
                status: Status.ACTIVE,
            })
            .innerJoinAndSelect('companies_follows', 'companyfollow', 'companyfollow.company_id = companies.id')
            .where('companyfollow.user_id = :user ', { user: userId })
            .andWhere('companies.is_active = :isActive', { isActive: 1 })
            .getMany();
    } */

    async createCompany(dto: CreateCompanyDto): Promise<Company> {
        const company = this.create(dto);
        const savedCompany = await this.save(company);
        return savedCompany[0];
    }

    async activeCompany(id: number): Promise<boolean> {
        const company = await this.findOneById(id);
        company.isActive = true;
        const companyToUpdate = await this.save(company);
        return !!companyToUpdate;
    }

    async updateCompany(companyId: number, dto: UpdateCompanyDto): Promise<Company> {
        const company = await this.findOneById(companyId);
        const companyToUpdate = Object.assign(company, dto);
        return await this.save(companyToUpdate);
    }

    async deleteCompany(companyId: number): Promise<Company> {
        const company = await this.findOneById(companyId);
        await this.disabledCompany(companyId);
        await this.createQueryBuilder()
            .update(Company)
            .set({ deleted: true })
            .where('id = :id', { id: companyId })
            .execute();
        return company;
    }

    async disabledCompany(companyId: number): Promise<boolean> {
        const updateCom = await this.createQueryBuilder()
            .update(Company)
            .set({ isActive: false })
            .where('id = :id', { id: companyId })
            .execute();
        return !!updateCom;
    }
}
