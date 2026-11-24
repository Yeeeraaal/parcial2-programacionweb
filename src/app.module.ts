import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '@nestjs/authentication';
import { AuthorizationModule } from '@nestjs/authorization';
import { CustomJwtBearerProvider } from './auth/jwt-bearer.provider';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { RolePolicy } from './roles/policies/role.policy';
import { UserPolicy } from './users/policies/user.policy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<number>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Role],
        synchronize: false,
      }),
    }),
    AuthenticationModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        accessToken: {
          key: config.get<string>('JWT_SECRET')!,
          expiresIn: config.get<string>('JWT_EXPIRES_IN', '2m') as any,
        },
        refreshToken: {
          ttl: config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d') as any,
        },
        allowInMemoryStorage: true,
      }),
    }),
    AuthorizationModule.forRoot({
      policies: [RolePolicy, UserPolicy],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  providers: [CustomJwtBearerProvider],
})
export class AppModule {}

