import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, NotFoundException, NotImplementedException } from "@nestjs/common";
import { Request, Response } from 'express';
import { ResponseService } from "src/controller/dto/response-service.dto";
import { BusinessException } from './business-exceptions';


@Catch()
export class ExceptionManager implements ExceptionFilter {
  // ...
  catch(exception, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let result: ResponseService;

    if (exception instanceof BusinessException) {
      console.error('exception => ', exception);
      result = new ResponseService(false, exception.description, exception.code, exception.details);
    }
    else if (exception instanceof NotImplementedException || exception instanceof NotFoundException)
      result = new ResponseService(false, 'Metodo no implementado en el servicio.', exception.getStatus() | HttpStatus.NOT_IMPLEMENTED);
    else
      result = new ResponseService(false, exception.message, exception.getStatus() | HttpStatus.INTERNAL_SERVER_ERROR);

    console.error('exception result => ', result);

    response
      .status(result.status)
      .json(result);
  }
}