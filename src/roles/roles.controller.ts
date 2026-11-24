import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Can } from '@nestjs/authorization';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolePolicy } from './policies/role.policy';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(201)
  @Can(RolePolicy, 'create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @HttpCode(200)
  @Can(RolePolicy, 'read')
  findAll() {
    return this.rolesService.findAll();
  }
}
