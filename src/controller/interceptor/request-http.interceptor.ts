import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { map, Observable, tap } from 'rxjs';
import GeneralUtil from 'src/common/utils/utils';
import { ResponseService } from '../dto/response-service.dto';

/**
 * Intercepta todas la solicitudes http que llegen al servicio para formatear la respuesta
 */
@Injectable()
export class RequestHttpInterceptor implements NestInterceptor<ResponseService> {

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseService> {

    const now = moment();
    const requestTime = moment().format();
    const req = context.switchToHttp().getRequest();
    const resp = context.switchToHttp().getResponse();

    return next.handle()
      .pipe(
        map(data => (
          {
            ...data,
            requestTime,
            responseTime: moment().diff(now),
            method: req.method,
            origen: GeneralUtil.getOrigin(context.getArgs()[0]['url']),
            status: data?.status || resp?.statusCode
          }
        )),
        tap((_result: ResponseService) => {
          console.log(`Response transaction => ${moment().format()} - ${_result.responseTime}ms - ${_result.process || ''} - ${req.method} - ${_result.origen} - ${_result.status} - ${_result.success} `);
        })
      );
  }

}

