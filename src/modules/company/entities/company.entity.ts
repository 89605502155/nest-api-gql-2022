import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities';
import { IsActive, Deleted } from '@/shared/enums';
/* import { Timetable } from '../../timetable/entities';
import { CompanyCategory } from './company-category.entity';
import { CompanyFollow } from './company-follow.entity';
import { Reservation } from '../../reservation/entities';
import { DayCompany } from '../../day/entities'; */

@Entity({ name: 'companies' })
export class Company {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', nullable: true, length: 50 })
    city: string;

    @Column({ type: 'varchar', nullable: true, length: 150 })
    description: string;

    @Column({ type: 'varchar', length: 100 })
    address: string;

    @Column({ type: 'varchar', length: 20 })
    phone: string;

    @Column({ type: 'varchar', nullable: true, length: 240 })
    image: string;

    @Column({
        type: 'int',
        nullable: true,
        name: 'is_active',
        default: IsActive.TRUE,
        transformer: {
            from: (value: number) => value == IsActive.TRUE,
            to: (value: boolean) => (value ? IsActive.TRUE : IsActive.FALSE),
        },
    })
    isActive: boolean;

    @Column({ type: 'int', name: 'user_id', nullable: false })
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({
        type: 'int',
        nullable: true,
        name: 'deleted',
        default: Deleted.FALSE,
        transformer: {
            from: (value: number) => value == Deleted.TRUE,
            to: (value: boolean) => (value ? Deleted.TRUE : Deleted.FALSE),
        },
    })
    deleted: boolean;

    /*  @OneToMany(() => CompanyCategory, (companyCategory) => companyCategory.company)
    companyCategories!: CompanyCategory[];

    @OneToMany(() => Timetable, (companyTimetable) => companyTimetable.company)
    timetables: Timetable[];

    @OneToMany(() => DayCompany, (dayCompany) => dayCompany.company)
    daysCompany: DayCompany[];

    @OneToMany((type) => CompanyFollow, (companyFollow) => companyFollow.company, { cascade: true })
    companyFollow: CompanyFollow[];

    @OneToMany((type) => Reservation, (reservation) => reservation.company)
    reservations: Reservation[]; */
}
