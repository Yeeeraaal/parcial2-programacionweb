import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';




@Entity('parkingspots')
export class Parkingspot {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  code: string;



  @Column({ type: 'uuid' })
  id_supervisor: string;


  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_supervisor' })
  supervisor: User;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;




}
