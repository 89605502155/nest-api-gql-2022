import * as bcrypt from 'bcryptjs';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../../shared/enums';
import { Role } from '../../role/entities';
/* import { CompanyFollow } from '../../company/entities';
import { Reservation } from '../../reservation/entities';
import { Sale } from '../../sale/entities';
import { GiftCardUser } from '../../giftcard/entities';
import { CouponUser } from '../../coupon/entities';
import { UserDetail } from './user-details.entity';
import { Notification } from '../../firebase/entities';
 */
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: true, length: 25, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 60 })
    email: string;

    @Column({ type: 'varchar', length: 60, select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) return;
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({ type: 'int', name: 'role_id' })
    roleId: number;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Column({
        type: 'int',
        name: 'status',
        default: Status.ACTIVE,
        transformer: {
            from: (value: number) => Status[value],
            to: (value: number) => value,
        },
    })
    status: Status;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    /* @OneToMany((type) => CompanyFollow, (userFollow) => userFollow.user, { cascade: true })
    companyFollow: CompanyFollow[];

    @OneToMany((type) => Sale, (sale) => sale.user, { cascade: true })
    sales: Sale[];

    @OneToMany((type) => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];

    @OneToMany(() => GiftCardUser, (giftcardUser) => giftcardUser.user, { cascade: true })
    giftcardUser: GiftCardUser[];

    @OneToMany(() => CouponUser, (couponUser) => couponUser.user, { cascade: true })
    couponUser: CouponUser[];

    @OneToMany(() => UserDetail, (userDetail) => userDetail.user, { cascade: true })
    userDetails: UserDetail[];

    @OneToMany(() => Notification, (Notification) => Notification.user, { cascade: true })
    notifications: Notification[]; */
}
