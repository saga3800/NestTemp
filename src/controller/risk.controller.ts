import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

import { IRiskService } from '../controller/service/risks.service';
import { RiskFlowReqDTO } from './dto';

import urlConfig from '../common/configuration/general.config';
@Controller(`${urlConfig.apiVersion}${urlConfig.controllerRisk}`)
export class RiskController {

  constructor(private readonly riskService: IRiskService) {}

  @Post(urlConfig.riskFraudUrl)
  @ApiOperation({
    description: "Valida el riesgo dependiendo del numero de documento"
  })
  async consultFraudList(
    @Body() riskFlow: RiskFlowReqDTO,
    @Res() res: Response,
  ) {
    const resValue = await this.riskService.validateRiskAnalysis(riskFlow);
    return res.status(HttpStatus.OK).json(resValue);
  }
}
