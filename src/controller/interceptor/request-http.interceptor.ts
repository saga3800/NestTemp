import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import * as moment from 'moment';
import { ResponseService } from '../dto/response-service.dto';
import generalConfig from '../../common/configuration/general.config';

/**
 * Intercepta todas la solicitudes http que llegen al servicio para formatear la respuesta
 */
@Injectable()
export class RequestHttpInterceptor<T> implements NestInterceptor<T, ResponseService<T>> {

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseService<T>> {

    const now = moment();
    const requestTime = moment().format();
    const req = context.switchToHttp().getRequest();
    const resp = context.switchToHttp().getResponse();

    return next.handle()
      .pipe(
        map(data => ({ ...data, requestTime, responseTime: moment().diff(now), method: req.method, origen: this.getOrigin(context.getArgs()[0]['url']), status: data.status || resp.statusCode }
        )),
        tap((_result: ResponseService) => {
            console.log(`Response transaction => ${moment().format()} - ${_result.responseTime}ms - ${_result.process || ''} - ${req.method} - ${_result.origen} - ${_result.status} - ${_result.success} `);
        })
      );
  }


  private getOrigin(url: string): string {
    return `${generalConfig.apiMapping}${(url?.includes('?')) ? url.slice(0, url.indexOf('?')) : url}`;
  }

}

