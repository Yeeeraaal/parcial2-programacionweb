import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Credenciales incorrectas' })
  @IsNotEmpty({ message: 'Credenciales incorrectas' })
  email: string;

  @IsString({ message: 'Credenciales incorrectas' })
  @IsNotEmpty({ message: 'Credenciales incorrectas' })
  password: string;
}

