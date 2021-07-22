import { plans } from './plans';
import * as __ from 'lodash';

const rTracer = require('cls-rtracer');
const moment = require('moment');

export default class UtilConfig {
  itemsFlow = [];
  isValidate: boolean;

  public static get getCorrelationalId(): string {
    return rTracer.id() || '';
  }

  public validateFlow(data) {
    this.itemsFlow = [];
    data.flow.map((item) => {
      const f = __.filter(plans.properties, item);
      f.map((p) => {
        const FLOWS_ID_VALIDATE = [1, 3, 6, 7, 8, 9].includes(p.flow);
        const SET_VALIDATE_FLOW = FLOWS_ID_VALIDATE
          ? (this.isValidate = true)
          : (this.isValidate = false);
        this.itemsFlow.push({ isValidate: SET_VALIDATE_FLOW });
      });
    });
    return this.itemsFlow;
  }
}
