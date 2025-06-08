import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const isPageDto = data && data.data && data.meta;

        return {
          statusCode: response.statusCode,
          message: data?.message || 'Request processed successfully',
          ...(isPageDto ? { ...data } : { data }),
        };
      }),
    );
  }
}
