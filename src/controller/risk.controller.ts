import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { IRiskService } from '../controller/service/risks.service';
import { RiskFlowReqDTO } from './dto';

import urlConfig from '../common/configuration/general.config';

@Controller(urlConfig.apiVersion + urlConfig.apiMapping)
export class RiskController {

  constructor(private readonly riskService: IRiskService) {}

  @Post(urlConfig.riskFraudUrl)
  async consultFraudList(
    @Body() riskFlow: RiskFlowReqDTO,
    @Res() res: Response,
  ) {
    const resValue = await this.riskService.validateRiskAnalysis(riskFlow);
    return res.status(HttpStatus.OK).json(resValue);
  }
}
