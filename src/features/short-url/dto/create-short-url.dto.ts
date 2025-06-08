import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
  @ApiProperty({
    example: 'https://www.example.com',
    description: 'URL original que será encurtada',
    required: true,
  })
  @IsNotEmpty()
  @IsUrl({}, { message: 'Informe uma URL válida' })
  originalUrl: string;
}
