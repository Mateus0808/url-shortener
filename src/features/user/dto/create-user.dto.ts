import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string

  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @IsString({ message: "A senha deve ser uma string"})
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
}