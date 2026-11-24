import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingspotsService } from './parkingspots.service';
import { CreateParkingSpotDto } from './dto/create-parkingspot.dto';
import { UpdateParkingspotDto } from './dto/update-parkingspot.dto';
import { Authenticate } from '@nestjs/authentication';
import { Authorize } from '@nestjs/authorization';



@Controller('parkingspots')
export class ParkingspotsController {
  constructor(private readonly parkingSpotsService: ParkingspotsService) { }

    @Post()
    @Authorize('admin', 'supervisor')
    create(@Body() createParkingSpotDto: CreateParkingSpotDto, @Req() req: any) {
        const userId = req.user?.sub || req.user?.id;
        return this.parkingspotsService.create(createParkingSpotDto, userId);
    }

    @Get()
    @Authorize('admin', 'supervisor', 'Conductor')
    findAll() {
        return this.parkingSpotsService.findAll();
    }

    @Get(':id')
    @Authorize('admin', 'supervisor', 'Conductor')
    findOne(@Param('id') id: string) {
        return this.parkingSpotsService.findOne(id);
    }

    @Patch(':id')
    @Authorize('admin', 'supervisor')
    update(
        @Param('id') id: string,
        @Body() updateParkingSpotDto: UpdateParkingSpotDto,
    ) {
        return this.parkingSpotsService.update(id, updateParkingSpotDto);
    }

    @Delete(':id')
    @Authorize('admin')
    remove(@Param('id') id: string) {
        return this.parkingSpotsService.remove(id);
    }
}
