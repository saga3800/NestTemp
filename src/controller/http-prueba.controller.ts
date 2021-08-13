import { Controller, Get, Param } from "@nestjs/common";
import generalConfig from "src/common/configuration/general.config";
import { IHttpPruebaService } from "./service/http-prueba.service";

@Controller(`${generalConfig.apiVersion}${generalConfig.controllerHttpProvider}`)
export class HttpPruebaController {
  constructor(private readonly _httpPruebaService: IHttpPruebaService) {}

  @Get('/:id')
  getById(@Param('id') _id: string) {
    return this._httpPruebaService.getById(_id);
  }
}