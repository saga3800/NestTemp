import { Injectable } from "@nestjs/common";
import servicesConfig from "src/common/configuration/services.config";
import { Etask } from "src/common/utils/enums/taks.enum";
import { IHttpPruebaProvider } from "../http-prueba.provider";
import { IHttpProvider } from "../http.provider";
import { EHttpMethod } from "../model/http/request-config-http.model";
import { ResponseHttp } from "../model/http/response-http.model";

@Injectable()
export class HttpPruebaProvider implements IHttpPruebaProvider {

    constructor(
        private httpProvider: IHttpProvider
    ) { }


    async getById(_id: string): Promise<ResponseHttp<any>> {
        const url = servicesConfig.testService;
        const headers = {
            "Connection": "Keep-Alive",
            "Content-Type": "application/json; charset=utf-8",
            "Date": Date.now().toString,
            "Cache-Control": "no-cache"
        };
        const params = {
            "id": _id
        };

        return await this.httpProvider.executeRest({ method: EHttpMethod.get, url, params, headers}, Etask.FINDALL);
    }

}