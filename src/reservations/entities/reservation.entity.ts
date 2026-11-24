import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Parkingspot } from '../../parkingspots/entities/parkingspot.entity';



export enum Charger_type {
    STANDARD = 'STANDARD',
    FAST = 'FAST',
    ULTRA_FAST = 'ULTRA_FAST',
}


export enum status {
    pending = 'pending',
    completed = 'completed',
    cancelled = 'cancelled',
}



@Entity('reservations')
export class Reservation {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({ type: 'uuid', nullable: false })
    id_user: string;


    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;


    @Column({ type: 'uuid', nullable: false })
    id_spot: string;

    @ManyToOne(() => Parkingspot, (spot) => spot.id)
    @JoinColumn({ name: 'id_spot' })
    spot: Parkingspot;


    @Column({ type: 'timestamp', nullable: false })
    date: Date;

    //, pattern: @"^[0-9]{3}[A-Z]{3}$"   no se como ponerlo---pendiente
    @Column({ type: 'varchar', nullable: false })
    vehicle_plate: string;



    @Column({ type: 'varchar', default: Charger_type.STANDARD })
    vehicle_max_charge: Charger_type;


    @Column({ type: 'varchar', default: status.pending })
    status: status;



    @CreateDateColumn()
    created_at: Date;

}
