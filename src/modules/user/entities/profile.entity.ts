import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'profiles' })
export class Profile {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', name: 'user_id', nullable: false })
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar', nullable: true, length: 60 })
    firstname: string;

    @Column({ type: 'varchar', nullable: true, length: 60 })
    lastname: string;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    address: string;

    @Column({ type: 'varchar', nullable: true, length: 20 })
    phone: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
