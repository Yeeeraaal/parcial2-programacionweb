import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;  

  @Column({ type: 'varchar', unique: true, nullable: false })
  role_name: string;  

  @Column({ type: 'varchar', nullable: true })
  description?: string;  

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;  

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];  
}