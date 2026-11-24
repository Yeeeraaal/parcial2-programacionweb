import { MigrationInterface, QueryRunner } from "typeorm";
import { PasswordHasher } from '@nestjs/authentication';

export class SeedAdminUser1795498138710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasher = new PasswordHasher();
    const hashedPassword = await hasher.hash('Admin1234!');

    // 1. Crea el rol admin
    await queryRunner.query(`
      INSERT INTO "roles" ("id", "role_name", "description")
      VALUES ('11111111-1111-1111-1111-111111111111', 'admin', 'Administrador del sistema')
      ON CONFLICT ("role_name") DO NOTHING;
    `);

    // 2. Crea el usuario admin (email: admin@uniandes.edu.co, pass: Admin1234!)
    await queryRunner.query(`
      INSERT INTO "users" ("id", "email", "password", "name", "phone", "is_active")
      VALUES (
        '22222222-2222-2222-2222-222222222222',
        'admin@uniandes.edu.co',
        '${hashedPassword}',
        'Administrador Principal',
        '3000000000',
        true
      )
      ON CONFLICT ("email") DO NOTHING;
    `);

    // 3. Le asigna el rol admin al usuario admin
    await queryRunner.query(`
      INSERT INTO "users_roles" ("user_id", "role_id")
      VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111')
      ON CONFLICT DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users_roles" WHERE "user_id" = '22222222-2222-2222-2222-222222222222';`);
    await queryRunner.query(`DELETE FROM "users" WHERE "email" = 'admin@uniandes.edu.co';`);
    await queryRunner.query(`DELETE FROM "roles" WHERE "role_name" = 'admin';`);
  }
}

