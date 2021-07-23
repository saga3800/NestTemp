import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

import { IRiskProvider } from "../risk.provider";
import servicesConfig from '../../../common/configuration/services.config';

import * as moment from 'moment';

@Injectable()
export class RiskProviderImpl implements IRiskProvider {

  itemsFlow = [];
  dateInside: string = moment().format('YYYY-MM-DDTHH:mm:ss');

  constructor(private http: HttpService) {}

  /**
   * This method consume service ms-risk
   * @param data 
   * @returns 
   */

  async consumeRiskMSRisk(data) {
    let response;
    let objReq = {
      correo: data.InfoUser.email,
      tipoDoc: data.InfoUser.typeDocument,
      numDoc: data.InfoUser.numberDocument,
      telefono: data.InfoUser.telephoneNumber,
    };

    let service = this.http
      .post(`${servicesConfig.riskService}`, objReq)
      .pipe(map((response) => response.data));

    await service.forEach((res) => {
      response = res;
    });

    return response;
  }
}
