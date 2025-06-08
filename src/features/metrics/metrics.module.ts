import { Module } from '@nestjs/common';
import {
  makeCounterProvider,
  makeHistogramProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { CustomMetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { Registry } from 'prom-client';

@Module({
  imports: [PrometheusModule.register({})],
  controllers: [MetricsController],
  providers: [
    CustomMetricsService,
    Registry,
    makeCounterProvider({
      name: 'url_shortened_total',
      help: 'Total de URLs encurtadas',
    }),
    makeHistogramProvider({
      name: 'shorten_request_duration_seconds',
      help: 'Duração da criação de URL encurtada em segundos',
      buckets: [0.1, 0.5, 1, 2, 5],
    }),
  ],
  exports: [CustomMetricsService],
})
export class MetricsModule {}
