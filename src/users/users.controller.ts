import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { Can } from '@nestjs/authorization';
import { UsersService } from './users.service';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { UserPolicy } from './policies/user.policy';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id/roles')
  @HttpCode(200)
  @Can(UserPolicy, 'assignRoles')
  assignRoles(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() assignRolesDto: AssignRolesDto,
  ) {
    return this.usersService.assignRoles(id, assignRolesDto.roles);
  }

  @Get('me')
  @HttpCode(200)
  @Can(UserPolicy, 'readMe')
  getMe(@CurrentUser() user: User) {
    return this.usersService.getProfile(user.id);
  }

  @Get()
  @HttpCode(200)
  @Can(UserPolicy, 'readAll')
  findAll() {
    return this.usersService.findAll();
  }
}

