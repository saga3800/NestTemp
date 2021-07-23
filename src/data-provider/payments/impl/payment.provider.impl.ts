import { Injectable } from '@nestjs/common';

import soapRequest from 'easy-soap-request';
import xmlToJson from 'xml2js';

import { IPaymentProvider } from '../payment.provider';
import servicesConfig from '../../../common/configuration/services.config';

import { PaymentFactory } from '../../../factories';

@Injectable()
export class PaymentReferencesMgmtImpl implements IPaymentProvider {
    
  /**
   * build data from xml service
   * @param data
   * @returns
   */

  async request(data) {
    try {
      const url = servicesConfig.paymentReferencesMgmtService;
      const parser = new xmlToJson.Parser();

      let responseService = {};

      const Headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        soapAction: url,
      };

      const { response } = await soapRequest({
        url: url,
        headers: Headers,
        xml: data.xml,
      });

      parser.parseString(response.body, (err, result) => {
        if (err) {
          return err;
        }
        responseService = result;
      });
      return responseService;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method consume and return data from SOAP Payment service
   * @param data
   * @returns
   */

  async consumePaymentReferencesMgmt(data) {
    const payFactory = PaymentFactory.requestServicePayment(data);
    return payFactory;
  }
}
