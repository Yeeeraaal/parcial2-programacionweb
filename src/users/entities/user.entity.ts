import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; //[cite: 1]

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string; //[cite: 1]

  @Column({ type: 'varchar', nullable: false, select: false }) // Nunca devolver password[cite: 1, 5]
  password: string; //[cite: 1]

  @Column({ type: 'varchar', nullable: false })
  name: string; //[cite: 1]

  @Column({ type: 'varchar', nullable: true })
  phone?: string; //[cite: 1]

  @Column({ type: 'boolean', default: true })
  is_active: boolean; //[cite: 1]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; //[cite: 1]

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[]; //[cite: 1]
}