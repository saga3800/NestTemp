import { Injectable } from "@nestjs/common";
import { ResponseService } from "../dto/response-service.dto";

@Injectable()
export abstract class IHttpPruebaService {

    abstract getById(_id: string): Promise<ResponseService>;

}