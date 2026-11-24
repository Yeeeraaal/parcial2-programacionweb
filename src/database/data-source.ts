import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST, 
  port: Number(process.env.DB_PORT) || 5432, 
  username: process.env.DB_USER,
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME, 
  entities: [User, Role],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true, 
});