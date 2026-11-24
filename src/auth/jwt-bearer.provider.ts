import { Injectable } from '@nestjs/common';
import { JwtBearerProvider, JwtClaims } from '@nestjs/authentication';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CustomJwtBearerProvider extends JwtBearerProvider<User> {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  protected async validate(claims: JwtClaims): Promise<User | null> {
    if (!claims.sub) {
      return null;
    }
    const user = await this.usersService.findByIdWithRoles(claims.sub);
    if (!user || !user.is_active) {
      return null;
    }
    return user;
  }
}