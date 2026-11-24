import { Policy, PolicyBefore, Ability } from '@nestjs/authorization';
import { User } from '../../users/entities/user.entity';

@Policy()
export class RolePolicy implements PolicyBefore<User, Ability<RolePolicy>> {
  before(user: User | null): boolean | undefined {
    if (user?.roles?.some((r) => r.role_name === 'admin')) {
      return true;
    }
    return undefined;
  }

  create(user: User | null): boolean {
    return false;
  }

  read(user: User | null): boolean {
    return false;
  }
}
