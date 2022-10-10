import { UsePipes, ValidationPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver, Context } from '@nestjs/graphql';
import { Role } from '../../role/entities';
import { RoleService } from '../../role/services';
import {
    CreateUserDto,
    QueryUserEmailDto,
    UpdateUserDto,
    CreateProfileUserDto,
    /* NewContactDto, */
    FindByEmailDto,
} from '../dtos';
import { Profile, User } from '../entities';
import { ProfileService, UserService } from '../services';
import { ProfileInitializationInterceptors } from '../interceptors';
import { CreateCompanyInterceptor } from '@/modules/company/interceptors';
import { RoleType } from '@/modules/role/enums';
/* import { CreateCompanyDto } from '../../company/dtos';
import { CompanyService } from '../../company/services';
import { AuthGuard } from '../../auth/guards/';
import { MailService } from '../../mail/services';
import { RolesGuard } from '../../auth/guards';
import { Roles } from '../../auth/decorator'; 
import { RoleType } from '../../role/enums';*/

/* @UseGuards(RolesGuard)
 */
@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly profileService: ProfileService,
    ) {} /*  private readonly companyService: CompanyService,
        private readonly mailService: MailService, */

    /*   @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard) */
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    /*   @UseGuards(AuthGuard) */
    @Query(() => User, { nullable: true })
    async getUserData(@Context('user') user: User): Promise<User> {
        return this.userService.getUserById(user.id);
    }

    /*     @Roles(RoleType.SUPERUSER, RoleType.ADMIN, RoleType.CUSTOMER) */
    @Query(() => User, { nullable: true })
    async getUser(@Args('id') id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    /*  @Mutation(() => User, { nullable: true })
    async contactAdmin(@Args('input') input: NewContactDto): Promise<Boolean> {
        return await this.mailService.sendContact(input);
    } */

    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async findByEmail(@Args('input') input: QueryUserEmailDto): Promise<boolean> {
        return this.userService.findByEmail(input);
    }

    @UseInterceptors(ProfileInitializationInterceptors())
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async createUser(@Args('input') input: CreateUserDto): Promise<User> {
        return await this.userService.createUser(input);
    }

    /*   @UseGuards(AuthGuard) */
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async updateUser(@Context('user') user: User, @Args('input') input: UpdateUserDto): Promise<User> {
        return await this.userService.updateUser(user.id, input);
    }

    /*   @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async requestUserPassword(@Args('input') input: FindByEmailDto): Promise<boolean> {
        const user = await this.userService.requestUserPassword(input);
        const profile = await this.profileService.getProfileUserById(user.id);
        const email = await this.mailService.sendEmailRequestPassword(user, profile);
        return email;
    } */

    @UseInterceptors(CreateCompanyInterceptor())
    @UseInterceptors(ProfileInitializationInterceptors())
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async createUserCompany(@Args('input') input: CreateUserDto): Promise<User> {
        input.roleId = RoleType.BUSINESS;
        return await this.userService.createUser(input);
        //await this.mailService.sendEmailRegisterCompany(input, inputPro, inputCom);
    }

    /*    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard) */
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async deleteUser(@Args('id') id: number): Promise<User> {
        return await this.userService.deleteUser(id);
    }

    @ResolveField('profile', () => Profile)
    async profile(@Parent() user) {
        const { id } = user;
        return await this.profileService.getProfileUserById(id);
    }

    @ResolveField('role', () => Role)
    async role(@Parent() user) {
        const { roleId } = user;
        return await this.roleService.getRole(roleId);
    }
}
