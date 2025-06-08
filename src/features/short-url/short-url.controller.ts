import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Inject,
  Get,
  Param,
  Patch,
  Delete,
  Res,
} from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { Request, Response } from 'express';
import {
  ICreateShortUrlService,
  ICreateShortUrlServiceToken,
} from './interfaces/services/create-short-url-service.interface';
import {
  AccessTokenGuard,
  OptionalAuthGuard,
} from 'src/common/guards/access-token.guard';
import {
  IListUrlsByUserService,
  IListUrlsByUserServiceToken,
} from './interfaces/services/list-url-service.interface';
import {
  IDeleteUrlService,
  IDeleteUrlServiceToken,
} from './interfaces/services/delete-url-service.interface';
import {
  IUpdateUrlService,
  IUpdateUrlServiceToken,
} from './interfaces/services/update-url-service.interface';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { UnauthorizedError } from 'src/common/errors/unauthorized-error/unauthorized-error';
import { User } from '../user/user.entity';
import {
  IIncrementClickService,
  IIncrementClickServiceToken,
} from './interfaces/services/increment-clicks-service.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ShortUrlResponseDto } from './dto/short-url-response.dto';

@Controller('short-url')
export class ShortUrlController {
  constructor(
    @Inject(ICreateShortUrlServiceToken)
    private readonly createService: ICreateShortUrlService,

    @Inject(IListUrlsByUserServiceToken)
    private readonly listService: IListUrlsByUserService,

    @Inject(IDeleteUrlServiceToken)
    private readonly deleteService: IDeleteUrlService,

    @Inject(IUpdateUrlServiceToken)
    private readonly updateService: IUpdateUrlService,

    @Inject(IIncrementClickServiceToken)
    private readonly incrementClickService: IIncrementClickService,
  ) {}

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiOperation({ summary: 'Create a new shortened URL' })
  @ApiResponse({
    status: 201,
    description: 'URL shortened successfully',
    type: ShortUrlResponseDto,
  })
  @ApiBody({ type: CreateShortUrlDto })
  async createShortUrl(@Body() dto: CreateShortUrlDto, @Req() req: Request) {
    const user = req.user as User;
    return await this.createService.execute(dto, user?.id);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List shortened URLs of authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of URLs',
    type: [ShortUrlResponseDto],
  })
  async listUserUrls(@Req() req: Request) {
    const user = req.user as User;
    return await this.listService.execute(user.id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a shortened URL' })
  @ApiParam({ name: 'id', description: 'URL ID' })
  @ApiResponse({
    status: 200,
    description: 'URL updated successfully',
    type: ShortUrlResponseDto,
  })
  async updateUrl(
    @Param('id') id: string,
    @Body() dto: UpdateShortUrlDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const updatedUrl = await this.updateService.execute(
      { id, data: dto },
      user.id,
    );
    return updatedUrl;
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a shortened URL' })
  @ApiParam({ name: 'id', description: 'URL ID' })
  @ApiResponse({ status: 200, description: 'URL deleted successfully' })
  async deleteUrl(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    if (!user) throw new UnauthorizedError('Usuário precisa está autenticado');

    await this.deleteService.execute(id, user.id);

    return { message: 'URL excluída com sucesso' };
  }

  @Get(':code')
  @ApiOperation({ summary: 'Redirects the shortcode to the original URL' })
  @ApiParam({ name: 'code', description: 'URL Shortcode' })
  @ApiResponse({ status: 302, description: 'Redirection successful' })
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const url = await this.incrementClickService.execute(code);

    return res.redirect(url.originalUrl);
  }
}
