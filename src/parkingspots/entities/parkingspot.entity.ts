import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';


export enum Charger_type {  
  STANDARD = 'STANDARD',
  FAST = 'FAST',
  ULTRA_FAST = 'ULTRA_FAST',
}

@Entity('parkingspots')
export class Parkingspot {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column({ unique: true,  nullable: false})
    code: string;


    @Column({ type: 'varchar', length: 20, default: Charger_type.STANDARD })
  status: Charger_type;

    @Column({ type: 'uuid' })
    id_supervisor: string;


    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_supervisor' })
    supervisor: User;


    @CreateDateColumn()
    created_at: Date;








    








    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;




}
