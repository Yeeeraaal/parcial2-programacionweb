import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Parkingspot } from '../parkingspots/entities/parkingspot.entity';
import { User } from '../users/entities/user.entity';



@Injectable()
export class ReservationsService {


  constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(ParkingSpot)
        private readonly spotRepository: Repository<ParkingSpot>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


  create(createReservationDto: CreateReservationDto) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
