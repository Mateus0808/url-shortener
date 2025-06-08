import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
}
