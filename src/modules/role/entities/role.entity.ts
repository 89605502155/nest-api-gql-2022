import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '../../../shared/enums';
//import { User } from '../../user/entities';

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 20 })
    name: string;

    @Column({ type: 'varchar', length: 240 })
    description: string;

    @Column({ type: 'varchar', default: Status.ACTIVE, length: 9 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true, name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true, name: 'updated_at' })
    updatedAt: Date;

    /*   @OneToMany(() => User, (user) => user.role)
    users: User[]; */
}
