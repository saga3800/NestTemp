import { Injectable } from '@nestjs/common';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { IRequestConfigHttp, IRequestConfigHttpSOAP } from './model/http/request-config-http.model';

import { ResponseHttp } from './model/http/response-http.model';

@Injectable()
export abstract class IHttpProvider {

    abstract executeRest<R = any>(_requestConfig: IRequestConfigHttp, _task?: Etask | string): Promise<ResponseHttp<R>>;

    abstract executeSAOP<R = any>(_requestConfig: IRequestConfigHttpSOAP, _task?: Etask): Promise<ResponseHttp<R>>;

}