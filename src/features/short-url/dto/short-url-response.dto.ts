import { ApiProperty } from '@nestjs/swagger';

export class ShortUrlResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  originalUrl: string;

  @ApiProperty()
  shortenerUrl: string;

  @ApiProperty()
  clicks: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
