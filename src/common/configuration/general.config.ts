export default {
  logLevel: process.env.LOG_LEVEL || 'ALL',
  port: process.env.PORT || 8080,
  apiVersion: process.env.API_VERSION || '/V1',
  apiMapping: process.env.API_MAPPING || 'APIMAutEntiFraudValidate',
  controllerRisk: process.env.CONTROLLER || '/risks',
  apiOrigin: process.env.API_ORIGIN || 'APIMAutEntiFraudValidate',
  riskFraudUrl: process.env.RISK_FRAUD_URL || '/customer/consultfraudlist',
};
