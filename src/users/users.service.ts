import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByIdWithRoles(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
  }

  async assignRoles(userId: string, roleNames: string[]) {
    const user = await this.findByIdWithRoles(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const uniqueNames = [...new Set(roleNames)];
    const foundRoles = await this.rolesService.findByNames(uniqueNames);

    if (foundRoles.length !== uniqueNames.length) {
      throw new BadRequestException('roles inválidos');
    }

    user.roles = foundRoles;
    await this.userRepository.save(user);

    return { message: 'Roles asignados' };
  }

  async getProfile(userId: string) {
    const user = await this.findByIdWithRoles(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone ?? null,
      roles: user.roles.map((r) => r.role_name),
    };
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: { roles: true },
      });

      return users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        roles: u.roles.map((r) => r.role_name),
      }));
    } catch {
      throw new InternalServerErrorException('Error al listar usuarios');
    }
  }
}