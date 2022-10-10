import { Status } from '@/shared/enums';

export class IUserPayload {
    readonly id: number;

    readonly username: string;

    readonly email: string;
    /**
     * User status ACTIVE | INACTIVE | default PREACTIVE
     */
    readonly status: Status;

    readonly roleId: number;

    readonly companyId?: number;
}
