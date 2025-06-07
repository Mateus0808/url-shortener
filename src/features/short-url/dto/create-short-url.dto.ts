import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
  @IsNotEmpty()
  @IsUrl({}, { message: 'Informe uma URL válida' })
  originalUrl: string;
}
