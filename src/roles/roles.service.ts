import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existing = await this.roleRepository.findOne({
      where: { role_name: createRoleDto.role_name },
    });

    if (existing) {
      throw new ConflictException('role_name ya existe');
    }

    const role = this.roleRepository.create(createRoleDto);
    const saved = await this.roleRepository.save(role);

    return {
      message: 'Rol creado con éxito',
      roleId: saved.id,
    };
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.find({
        select: {
          id: true,
          role_name: true,
          description: true,
        },
      });
      return roles;
    } catch {
      throw new InternalServerErrorException('Error al obtener roles');
    }
  }

  async findByNames(names: string[]): Promise<Role[]> {
    return this.roleRepository.find({
      where: { role_name: In(names) },
    });
  }
}
