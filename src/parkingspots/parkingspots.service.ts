import { Injectable, NotFoundException,BadRequestException, } from '@nestjs/common';
import { CreateParkingSpotDto } from './dto/create-parkingspot.dto';
import { UpdateParkingspotDto } from './dto/update-parkingspot.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parkingspot } from './entities/parkingspot.entity';


@Injectable()
export class ParkingspotsService {

  constructor(
        @InjectRepository(Parkingspot)
        private readonly spotRepository: Repository<Parkingspot>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

      async create(dto: CreateParkingSpotDto, currentUserId: string) {
        const supervisorId = dto.id_supervisor || currentUserId;

        const supervisor = await this.userRepository.findOne({
            where: { id: supervisorId },
        });
        if (!supervisor) {
            throw new NotFoundException('Supervisor no encontrado');
        }

        const existing = await this.spotRepository.findOne({
            where: { code: dto.code },
        });
        if (existing) {
            throw new BadRequestException('Ya existe un espacio con ese código');
        }

        const spot = this.spotRepository.create({
            code: dto.code,
            charger_type: dto.charger_type,
            id_supervisor: supervisorId,
        });

        return await this.spotRepository.save(spot);
    }

    async findAll() {
        return await this.spotRepository.find({ });
    }

    async findOne(id: string) {
        const spot = await this.spotRepository.findOne({
            where: { id } });
        if (!spot) {
            throw new NotFoundException('Espacio de parqueo no encontrado');
        }
        return spot;
    }

    async update(id: string, dto: UpdateParkingSpotDto) {
        const spot = await this.findOne(id);
        Object.assign(spot, dto);
        return await this.spotRepository.save(spot);
    }

    async remove(id: string) {
        const spot = await this.findOne(id);
        await this.spotRepository.remove(spot);
        return { message: 'Espacio de parqueo eliminado correctamente' };
    }


  //     async create(createTeamDto: CreateTeamDto): Promise<Team> {
  //   const existing = await this.teamRepository.findOne({
  //     where: { name: createTeamDto.name },
  //   });
  //   if (existing) { cambia para spots

  //     throw new ConflictException(`Ya existe un equipo con el nombre '${createTeamDto.name}'`);
  //   }

  //   const { characterIds, ...teamData } = createTeamDto;
  //   const team = this.teamRepository.create(teamData);
  //   const savedTeam = await this.teamRepository.save(team);

  //   if (characterIds && characterIds.length > 0) {
  //     await this.assignCharactersToTeam(savedTeam.id, characterIds);
  //   }

  //   return this.findOne(savedTeam.id);
  // }
}
