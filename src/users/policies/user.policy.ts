import { Policy, PolicyBefore, Ability } from '@nestjs/authorization';
import { User } from '../entities/user.entity';

@Policy()
export class UserPolicy implements PolicyBefore<User, Ability<UserPolicy>> {
  before(user: User | null): boolean | undefined {
    if (user?.roles?.some((r) => r.role_name === 'admin')) {
      return true;
    }
    return undefined;
  }

  readAll(user: User | null): boolean {
    return false;
  }

  assignRoles(user: User | null): boolean {
    return false;
  }

  readMe(user: User | null): boolean {
    return Boolean(user);
  }
}

