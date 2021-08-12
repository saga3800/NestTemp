import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import * as moment from 'moment';
import { ResponseService } from "../../controller/dto/response-service.dto";
import { EmessageMapping } from "../utils/enums/message.enum";
import GeneralUtil from "../utils/utils";
import { BusinessException } from './business-exceptions';


@Catch()
export class ExceptionManager implements ExceptionFilter {
  // ...
  async catch(exception, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest();

    let result: ResponseService;

    if (exception instanceof BusinessException) {
      console.error('exception => ', exception);
      result = new ResponseService(exception.success, exception?.details?.codMessage || exception?.description, exception.code, exception?.details?.document);
    }
    else if (exception instanceof HttpException)
      result = new ResponseService(false, EmessageMapping.DEFAULT_ERROR, exception.getStatus(), exception?.getResponse()['message']);
    else {
      console.error('exception => ', exception);
      result = new ResponseService(false, EmessageMapping.DEFAULT_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const origen: string = GeneralUtil.getOrigin(req['url']);

    console.error('exception result => ', result);

    response
      .status(result.status)
      .json({
        ...result,
        requestTime: moment().format(),
        method: req.method,
        origen
      });

    console.log(`Response transaction => ${moment().format()} - ${result.process || ''} - ${req.method} - ${origen} - ${result.status} - ${result.success}`);
  }
}