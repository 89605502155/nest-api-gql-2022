import { UsePipes, ValidationPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
/* import { QueryEmployeeDto } from '../../employee/dtos';
import { Employee } from '../../employee/entities';
import { EmployeeService } from '../../employee/services';
import { QueryServiceDto } from '../../service/dtos';
import { Service } from '../../service/entities';
import { ServiceService } from '../../service/services/service.service';
import { QueryTimetableDto } from '../../timetable/dtos';
import { Timetable } from '../../timetable/entities';
import { TimetableService } from '../../timetable/services/timetable.service'; */
import { CreateCompanyDto, /* QueryCompanyCategoryDto, */ UpdateCompanyDto, QueryCompanyDto } from '../dtos';
import { Company /*, CompanyCategory, CompanyLocation */ } from '../entities';
import { /* CompanyCategoryService, CompanyLocationService, */ CompanyService } from '../services';
import { AuthGuard, RolesGuard } from '@/modules/auth/guards/';
import { PaginationArgs } from '../../../shared/various/dtos';
import { User } from '../../user/entities';
import { UserService } from '@/modules/user/services';
/* import { GraphqlImageInterceptor } from '../../upload/interceptors';*/
import { RoleType } from '@/modules/role/enums';
import { Roles } from '@/modules/role/decorators';
import { SearchCasePipe } from '@/shared/various/pipes';
import { SearchDto } from '@/shared/various/dtos';
//import { MailActiveCompanyInterceptor } from '@/modules/mail/interceptors';
import { ActiveUserByCompanyInterceptor, InactiveUserByCompanyInterceptor } from '@/modules/user/interceptors';
//import { CompanyCategoriesInterceptor } from '../interceptors';

@UseGuards(RolesGuard)
@Resolver(() => Company)
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService, private readonly _userServices: UserService) {}
    /* private readonly _serviceService: ServiceService,
        private readonly _employeeService: EmployeeService,
        private readonly _timetableService: TimetableService,
        private readonly _locationService: CompanyLocationService,
        private readonly _companyCategoryService: CompanyCategoryService, */

    @Roles(RoleType.SUPERUSER)
    @Query(() => [Company])
    public async getCompaniesAll(): Promise<Company[]> {
        return this.companyService.getCompaniesAll();
    }

    @UsePipes(new SearchCasePipe())
    @Query(() => [Company])
    public async getCompanies(
        @Args('input') input: SearchDto,
        @Args('pagination') pagination: PaginationArgs,
    ): Promise<Company[]> {
        return this.companyService.getCompanies(input, pagination);
    }

    /* @UsePipes(new ValidationPipe())
    @Query(() => [Company])
    public async getCompaniesByCategory(
        @Args('input') input: QueryCompanyDto,
        @Args('pagination') pagination: PaginationArgs,
    ): Promise<Company[]> {
        return this.companyService.getCompaniesByCategory(input, pagination);
    } */

    /* @Query(() => [Company])
    public async getCompaniesFollowByUser(@Args('userId') userId: number): Promise<Company[]> {
        return await this.companyService.getCompaniesFollowByUser(userId);
    } */

    @UsePipes(new SearchCasePipe())
    @Query(() => [Company])
    public async getCompaniesByName(
        @Args('input') input: SearchDto,
        @Args('pagination') pagination: PaginationArgs,
    ): Promise<Company[]> {
        return await this.companyService.getCompaniesByName(input, pagination);
    }

    @UsePipes(new SearchCasePipe())
    @Query(() => [Company])
    public async getCompaniesByNameCount(@Args('input') input: SearchDto): Promise<number> {
        return await this.companyService.getCompaniesByNameCount(input);
    }

    @Query(() => Company, { nullable: true })
    public async getCompany(@Args('id') id: number): Promise<Company> {
        return this.companyService.getCompany(id);
    }

    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Company, { nullable: true })
    public async createCompany(@Args('input') input: CreateCompanyDto): Promise<Company> {
        return await this.companyService.createCompany(input);
    }

    @Roles(RoleType.BUSINESS, RoleType.SUPERUSER)
    //@UseInterceptors(GraphqlImageInterceptor({ type: 'COMPANY', width: 400 }))
    @UsePipes(new ValidationPipe())
    @Mutation(() => Company)
    public async updateCompany(@Args('id') id: number, @Args('input') input: UpdateCompanyDto): Promise<Company> {
        return await this.companyService.updateCompany(id, input);
    }

    @Roles(RoleType.SUPERUSER)
    @UseInterceptors(InactiveUserByCompanyInterceptor)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Company)
    public async deleteCompany(@Args('id') id: number): Promise<Company> {
        return await this.companyService.deleteCompany(id);
    }

    @Roles(RoleType.SUPERUSER)
    //@UseInterceptors(MailActiveCompanyInterceptor())
    //@UseInterceptors(CompanyCategoriesInterceptor())
    @UseInterceptors(ActiveUserByCompanyInterceptor)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Company)
    public async activeCompany(@Args('id') id: number): Promise<boolean> {
        return await this.companyService.activeCompany(id);
    }

    @Roles(RoleType.SUPERUSER)
    @Mutation(() => Company)
    public async disabledCompany(@Args('id') id: number): Promise<boolean> {
        return await this.companyService.disabledCompany(id);
    }

    /* @ResolveField('service', () => [Service])
    async service(@Parent() company: Company) {
        const { id } = company;
        let input = new QueryServiceDto();
        input.companyId = id;
        return await this._serviceService.getServices(input);
    } */

    /* @ResolveField('employee', () => [Employee])
    async employee(@Parent() company: Company) {
        const { id } = company;
        let input = new QueryEmployeeDto();
        input.companyId = id;
        return await this._employeeService.getEmployees(input);
    } */

    /* @ResolveField('timetable', () => [Timetable])
    async timetable(@Parent() company: Company) {
        const { id } = company;
        let input = new QueryTimetableDto();
        input.companyId = id;
        return await this._timetableService.findTimetableCompany(input);
    } */

    @ResolveField('punctuation', () => Number)
    async punctuation(@Parent() company: Company): Promise<number> {
        //const { id } = company;
        return 5;
        //return await this.reservationDetailService.findPunctuacionByReservationId(id);
    }

    /* @ResolveField('location', () => CompanyLocation)
    async location(@Parent() company: Company) {
        const { id } = company;
        return await this._locationService.findOneByCompanyId(id);
    } */

    /*  @ResolveField('categories', () => CompanyCategory)
    async categories(@Parent() company: Company) {
        const { id } = company;
        const companyCat = new QueryCompanyCategoryDto();
        companyCat.companyId = id;
        return await this._companyCategoryService.getCompanyCategory(companyCat);
    }
 */
    @ResolveField('user', () => User)
    async user(@Parent() company: Company) {
        const { userId } = company;
        return await this._userServices.getUserById(userId);
    }
}
