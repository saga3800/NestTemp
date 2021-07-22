import { Injectable } from '@nestjs/common';

import { IRiskProvider } from '../../../data-provider/risk/risk.provider';
import { IRiskService } from '../risks.service';
import { RiskFlowReqDTO } from '../../dto';

@Injectable()
export class RiskService implements IRiskService {

  constructor(private riskProvider: IRiskProvider) {}

  /**
   * This method get results from ms-riskﬂ
   * @param data 
   * @returns 
   */

  async validateRiskAnalysis(data: RiskFlowReqDTO) {
    const res = await this.riskProvider
      .consumeRiskMSRisk(data)
      .then((respuesta) => respuesta);
    return res;
  }
}
