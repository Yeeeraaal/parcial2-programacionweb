import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingspotDto } from './create-parkingspot.dto';

export class UpdateParkingspotDto extends PartialType(CreateParkingspotDto) {}
