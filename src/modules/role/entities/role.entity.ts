import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '../../../shared/enums';
import { User } from '../../user/entities';

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 20 })
    name: string;

    @Column({ type: 'varchar', length: 240 })
    description: string;

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

    @CreateDateColumn({ type: 'timestamp', nullable: true, name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true, name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
