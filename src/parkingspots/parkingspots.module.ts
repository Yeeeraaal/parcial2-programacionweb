import { Module } from '@nestjs/common';
import { ParkingspotsService } from './parkingspots.service';
import { ParkingspotsController } from './parkingspots.controller';

@Module({
  controllers: [ParkingspotsController],
  providers: [ParkingspotsService],
})
export class ParkingspotsModule {}
