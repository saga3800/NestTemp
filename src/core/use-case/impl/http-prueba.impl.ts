import { Injectable } from "@nestjs/common";
import { IHttpPruebaProvider } from "src/data-provider/http-prueba.provider";
import { IHttpPruebaUc } from "../http-prueba.uc";

@Injectable()
export class HttpPruebaUcimpl implements IHttpPruebaUc {

    constructor(
        public readonly _httpPruebaProvider: IHttpPruebaProvider
    ) { }

    async getById(_id: string): Promise<any> {
        await this._httpPruebaProvider.getById(_id);
    }
}
