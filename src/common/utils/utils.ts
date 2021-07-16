const rTracer = require('cls-rtracer');
const moment = require('moment');

export default class UtilConfig {
  public static get getCorrelationalId(): string {
    return rTracer.id() || '';
  }

}
