export default {
  apiMapping: process.env.API_MAPPING || '/RSTemplateNestJS',
  apiVersion: process.env.API_VERSION || 'V1',
  controllerMessage: process.env.CONTROLLER_MESSAGE || '/Message',
  controllerTraceability: process.env.CONTROLLER_TRACEABILITY || '/Trace',
  controllerHttpProvider: process.env.HTTP_PROVIDER || '/HttpProvider',
  controllerMockup: process.env.CONTROLLER || '/Mockup',
  port: process.env.PORT || 8080,
  logLevel: process.env.LOG_LEVEL || 'ALL',
};