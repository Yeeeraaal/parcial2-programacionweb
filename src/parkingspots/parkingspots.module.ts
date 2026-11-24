import { Module } from '@nestjs/common';
import { ParkingspotsController } from './parkingspots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingspotsService} from './parkingspots.service';
import { Parkingspot } from './entities/parkingspot.entity';
import { User } from '../users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Parkingspot, User])],
    controllers: [ParkingspotsController],
    providers: [ParkingspotsService],
    exports: [TypeOrmModule],
})
export class ParkingspotsModule {}
