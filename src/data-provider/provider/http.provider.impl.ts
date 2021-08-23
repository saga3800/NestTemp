import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { IHttpProvider } from '../http.provider';
import { IRequestConfigHttp, IRequestConfigHttpSOAP } from '../model/http/request-config-http.model';
import servicesConfig from 'src/common/configuration/services.config';
import { ResponseHttp } from '../model/http/response-http.model';
import Logging from 'src/common/lib/logging';
import GeneralUtil from 'src/common/utils/utils';


@Injectable()
export class HttpProvider implements IHttpProvider {

   private readonly logger = new Logging(HttpProvider.name);

   constructor() { }


   async executeRest<R = any>(_requestConfig: IRequestConfigHttp, _task?: Etask): Promise<ResponseHttp<R>> {

      let result: ResponseHttp;

      try {

         this.logger.write('Inicia ejecución HTTP.', _task, false, _requestConfig);

         const respose = await axios.request(
            {
               ..._requestConfig,
               headers: _requestConfig.headers ?? { "content-type": "application/json" },
               responseType: 'json',
               timeout: servicesConfig.httpConfig.timeout
            }
         );

         result = new ResponseHttp(respose);

      }
      catch (error) {
         result = new ResponseHttp(error);
      }

      this.logger.write('Resultado ejecución HTTP', _task, !result.executed, result);
      return result;
   }


   async executeSAOP<R = any>(_requestConfig: IRequestConfigHttpSOAP, _task?: Etask): Promise<ResponseHttp<R>> {

      let result: ResponseHttp;

      try {

         this.logger.write('Inicia ejecución HTTP SOAP.', _task, false, _requestConfig);

         const respose = await axios.request(
            {
               url: _requestConfig.url,
               data: _requestConfig.data,
               method: 'POST',
               responseType: 'text',
               headers: {
                  "Content-Type": "text/xml;charset=UTF-8",
                  "soapAction": _requestConfig.soapAction
               },
               timeout: servicesConfig.httpConfig.timeout
            }
         );
         result = new ResponseHttp(respose);
      }
      catch (error) {
         result = new ResponseHttp(error);
      }

      //Se transforma respuesta xml del servicio a json
      result.data = await GeneralUtil.convertXmlToJson(result.data);
   
      this.logger.write('Resultado ejecución HTTP SOAP', _task, !result.executed, result);

      return result;
   }

}