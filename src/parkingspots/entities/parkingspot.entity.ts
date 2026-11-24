import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';


export enum ReservationStatus {
  STANDARD = 'STANDARD',
  FAST = 'FAST',
  ULTRA_FAST = 'ULTRA_FAST',
}

@Entity('parkingspots')
export class Parkingspot {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    id_user:string;

    @Column({type: 'varchar', nullable: false})
    id_spot:string;

    @Column({ type: 'date', nullable: false })
    date:Date;

    @Column({ type: 'varchar', nullable: false })
    vehicle_plate:string;

    @Column({ type: 'varchar', nullable: false })
    vehicle_max_charge:string;

    @







    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;




}
