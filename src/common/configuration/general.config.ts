export default {
  apiMapping: process.env.API_MAPPING || '/RSTemplateNestJS',
  apiVersion: process.env.API_VERSION || 'V1',
  controllerMessage: process.env.CONTROLLER_MESSAGE || '/Message',
  controllerHttpProvider: process.env.HTTP_PROVIDER || '/HttpProvider',
  controllerError: process.env.CONTROLLER_ERROR || '/errors',
  controllerMockup: process.env.CONTROLLER || '/Mockup',
  port: process.env.PORT || 8080,
  logLevel: process.env.LOG_LEVEL || 'ALL',
  ttlCache: Number(process.env.TTL_CACHE || 0)
}
export class GlobalReqOrigin{
  static globalOrigin: any;
  static client:Object;
  static request:any;
  static requestHeaders:string;
}