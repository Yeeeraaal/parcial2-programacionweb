import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PasswordHasher, TokenService } from '@nestjs/authentication';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existing = await this.usersService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('Email ya registrado');
    }

    const hashedPassword = await this.passwordHasher.hash(registerDto.password);
    const user = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      name: registerDto.name,
      phone: registerDto.phone,
    });

    return {
      message: 'Usuario registrado con éxito',
      userId: user.id,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await this.passwordHasher.verify(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!user.is_active) {
      throw new HttpException('Usuario desactivado', HttpStatus.LOCKED);
    }

    const tokens = await this.tokenService.issue(user.id);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: 120,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('refreshToken es requerido');
    }

    try {
      const tokens = await this.tokenService.refresh(refreshToken);
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 120,
      };
    } catch {
      throw new UnauthorizedException('Refresh token inválido, ya usado o revocado');
    }
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('refreshToken es requerido');
    }

    try {
      await this.tokenService.revoke(refreshToken);
    } catch {
      // Si ya estaba revocado o expirado, igual completamos el cierre de sesión
    }
  }
}