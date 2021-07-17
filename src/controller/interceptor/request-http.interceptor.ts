import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { ResponseService } from '../dto/response-service.dto';

/**
 * Intercepta todas la solicitudes http que llegen al servicio para formatear la respuesta
 */
@Injectable()
export class RequestHttpInterceptor<T> implements NestInterceptor<T, ResponseService<T>> {

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseService<T>> {

    const now = moment();
    const requestTime = moment().format();
    const req = context.switchToHttp().getRequest();

    return next.handle()
      .pipe(
        map(data => ({ ...data, requestTime, responseTime: moment().diff(now), method: req.method, origen: this.getOrigin(context.getArgs()[0]['url']), status: data?.status ?? req.statusCode }
        )),
        tap((_result) => {
          if (req.method != 'GET' && req.statusCode == HttpStatus.OK)
            console.log('response => ', _result);
        })
      );
  }


  private getOrigin(url: string): string {
    return (url?.includes('?')) ? url.slice(0, url.indexOf('?')) : url;
  }

}

