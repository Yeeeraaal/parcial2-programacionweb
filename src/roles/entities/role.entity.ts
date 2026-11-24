import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string; //[cite: 1, 2]

  @Column({ type: 'varchar', unique: true, nullable: false })
  role_name: string; //[cite: 1, 2]

  @Column({ type: 'varchar', nullable: true })
  description?: string; //[cite: 1, 2]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; //[cite: 1]

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]; //[cite: 1]
}