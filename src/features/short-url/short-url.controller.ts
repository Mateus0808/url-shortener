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
  async createShortUrl(@Body() dto: CreateShortUrlDto, @Req() req: Request) {
    const user = req.user as User;
    return await this.createService.execute(dto, user?.id);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  async listUserUrls(@Req() req: Request) {
    const user = req.user as User;
    return await this.listService.execute(user.id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
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
  async deleteUrl(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    if (!user) throw new UnauthorizedError('Usuário precisa está autenticado');

    await this.deleteService.execute(id, user.id);

    return { message: 'URL excluída com sucesso' };
  }

  @Get(':code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const url = await this.incrementClickService.execute(code);

    return res.redirect(url.originalUrl);
  }
}
