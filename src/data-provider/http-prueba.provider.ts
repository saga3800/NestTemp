import { Injectable } from "@nestjs/common";
import { ResponseHttp } from "./model/http/response-http.model";

@Injectable()
export abstract class IHttpPruebaProvider {

    abstract getById(_id: string): Promise<ResponseHttp>;

}