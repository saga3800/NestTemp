export default {
    logLevel: process.env.LOG_LEVEL || 'ALL',
    port: process.env.PORT || 3000,
    apiVersion: process.env.API_VERSION || '/v1',
    apiMapping: process.env.API_MAPPING || '/risks',
    apiOrigin: process.env.API_ORIGIN || 'APIMAutEntiFraudValidate',
    riskFraudUrl: '/customer/consultfraudlist',
  };