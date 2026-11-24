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
    
    @Column({ unique: true })
    code: string;


      @Column({ type: 'varchar', length: 20, default: CharacterStatus.ACTIVE })
  status: Charger_type;

    








    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;




}
