import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from 'express';
import * as moment from 'moment';
import { ResponseService } from "../../controller/dto/response-service.dto";
import { EmessageMapping } from "../utils/enums/message.enum";
import GeneralUtil from "../utils/utils";
import { BusinessException } from './business-exceptions';
import Logging from "./logging";


@Catch()
export class ExceptionManager implements ExceptionFilter {

  private log: Logging = new Logging(ExceptionManager.name);

  // ...
  async catch(exception, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest();

    let result: ResponseService;

    if (exception instanceof BusinessException)
      result = new ResponseService(exception.success, exception?.details?.codMessage || exception?.description, exception.code, exception?.details?.document);
    else if (exception instanceof HttpException)
      result = new ResponseService(false, EmessageMapping.DEFAULT_ERROR, exception.getStatus(), exception?.getResponse()['message']);
    else
      result = new ResponseService(false, EmessageMapping.DEFAULT_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);

    const origen: string = GeneralUtil.getOrigin(req['url']);

    result = {
      ...result,
      requestTime: moment().format(),
      method: req.method,
      origen
    }

    this.log.write('Solicitud finalizada por excepion', exception?.details?.task, true, { body: req?.body, params: req?.params }, { exception, result });

    response
      .status(result.status)
      .json(result);

    Logger.error(`Response transaction => ${moment().format()} - ${result.process || ''} - ${req.method} - ${origen} - ${result.status} - ${result.success}`);
  }
}