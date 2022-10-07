import { IRole } from '@/modules/role/interfaces';
import { RoleType } from '@/modules/role/enums';
import { Status } from '@/shared/enums';

export const rolesSeed: IRole[] = [
    {
        id: RoleType.SUPERUSER,
        name: 'SUPERUSER',
        description: 'Este Rol puede operar toda la aplicacion con total libertad.',
        status: Status.ACTIVE,
    },
    {
        id: RoleType.ADMIN,
        name: 'ADMIN',
        description: 'Este Rol puede ejecutar todas las funciones que corresponden a un administrador.',
        status: Status.ACTIVE,
    },
    {
        id: RoleType.BUSINESS,
        name: 'BUSINESS',
        description: 'puede ejecutar todas las funciones que corresponden a un Negocio/Compañia.',
        status: Status.ACTIVE,
    },
    {
        id: RoleType.CUSTOMER,
        name: 'CUSTOMER',
        description: 'puede ejecutar todas las funciones que corresponden a un cliente o usuario final.',
        status: Status.ACTIVE,
    },
];
