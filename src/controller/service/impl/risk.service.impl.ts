import { Injectable } from '@nestjs/common';

import Logging from '../../../common/lib/logging';

import { IRiskService } from '../risks.service';
import { ResponseService, RiskFlowReqDTO } from '../../dto';

import { IRiskProvider } from '../../../data-provider/risk/risk.provider';
import { IPaymentProvider } from '../../../data-provider/payments/payment.provider';
import { MockResponse } from '../../../data-provider/mock/mock.response';

import { MappingMessageApi } from '../../../common/configuration/mapping-msg-api.config';
import { MappingStatusCode } from '../../../common/configuration/mapping-statuscode';
import generalConfig from '../../../common/configuration/general.config';

import UtilConfig from '../../../common/utils/utils';

@Injectable()
export class RiskService implements IRiskService {
  
  private readonly logger = new Logging(RiskService.name);
  public utilConfig = new UtilConfig();

  constructor(
    private riskProvider: IRiskProvider,
    private paymentProvider: IPaymentProvider,
  ) {}

  /**
   *
   * @param data
   * @param message
   * @returns
   */

  setCustomResponse(data, message) {
    return new ResponseService(
      true,
      generalConfig.apiOrigin,
      MappingStatusCode.SUCCESS,
      message,
      data,
    );
  }

  /**
   * This method get results from ms-risk
   * @param data
   * @returns
   */

  async validateRiskAnalysis(data: RiskFlowReqDTO) {
    const vPlans = this.utilConfig.validateFlow(data);
    // console.log(vPlans[0]);
    await this.validatePaymentService(data);

    const numDoc = data.InfoUser.numberDocument;
    if (numDoc === '52862929') {
      const res = await this.riskProvider
        .consumeRiskMSRisk(data)
        .then((respuesta) => respuesta);
      return this.setCustomResponse(
        {
          riesgo: res.riesgo[0],
        },
        MappingMessageApi.SUCESSFULLY,
      );
    } else if (numDoc === '123456') {
      return this.setCustomResponse(
        { riesgo: MockResponse.riesgo },
        MappingMessageApi.BLACKLIST_REPORTED,
      );
    } else {
      return this.setCustomResponse({}, MappingMessageApi.SUCESSFULLY);
    }
  }

  async validatePaymentService(data){

    const resPay = await this.paymentProvider.consumePaymentReferencesMgmt(data);
    return resPay;
  }

  
}
