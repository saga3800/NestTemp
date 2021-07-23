import { plans } from './plans';
import * as __ from 'lodash';

const rTracer = require('cls-rtracer');
const moment = require('moment');
export default class UtilConfig {
  itemsFlow = [];

  public static get getCorrelationalId(): string {
    return rTracer.id() || '';
  }

  /**
   * 
   * @param data 
   * @returns 
   */

  public validateFlow(data) {
    this.itemsFlow = [];
    data.flow.map((item) => {
      const f = __.filter(plans.properties, item);
      f.map((p) => {
        const FLOWS_ID_VALIDATE = [1, 2, 4, 5, 8, 9, 10, 11].includes(p.flow);
        if (FLOWS_ID_VALIDATE) {
          this.itemsFlow.push({ isValidate: p.isValidate });
        }
      });
    });
    return this.itemsFlow;
  }

  public static homolgateTypeDoc(typeDoc:string){
    return typeDoc === 'CC' ? 1 : 2;
  }
}
