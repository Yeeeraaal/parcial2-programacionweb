import { Module } from '@nestjs/common';
import { AuthenticationRegistry } from '@nestjs/authentication';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CustomJwtBearerProvider } from './jwt-bearer.provider';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, CustomJwtBearerProvider],
  exports: [CustomJwtBearerProvider],
})
export class AuthModule {
  constructor(
    registry: AuthenticationRegistry,
    jwtProvider: CustomJwtBearerProvider,
  ) {
    registry.registerProvider(jwtProvider);
  }
}
