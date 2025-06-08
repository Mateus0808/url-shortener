import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class CustomMetricsService {
  constructor(
    @InjectMetric('url_shortened_total')
    private readonly urlShortenedCounter: Counter<string>,

    @InjectMetric('shorten_request_duration_seconds')
    private readonly shortenRequestDuration: Histogram<string>,
  ) {}

  incrementUrlShortened() {
    this.urlShortenedCounter.inc();
  }

  startTimerForShortenRequest() {
    return this.shortenRequestDuration.startTimer();
  }
}
