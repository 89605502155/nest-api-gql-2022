import { Status } from '@/shared/enums';

export interface IUser {
    readonly id: number;

    readonly username: string;

    readonly email: string;

    readonly roleId: number;

    password: string;

    /**
     * User status ACTIVE | INACTIVE | default PREACTIVE
     */
    readonly status?: keyof typeof Status;

    readonly createdAt?: Date;

    readonly updatedAt?: Date;
}
