import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { register } from 'prom-client';

@Controller('metrics')
export class MetricsController {
  @Get()
  @Header('Content-Type', register.contentType)
  async getMetrics(@Res({ passthrough: false }) res: Response): Promise<void> {
    const metrics = await register.metrics();
    res.send(metrics);
  }
}
