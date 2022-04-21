export default {
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME = process.env.ELASTIC_APM_SERVICE_NAME || 'ms-template-nestjs',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL = process.env.ELASTIC_APM_SERVER_URL || 'http://100.123.251.89:8200',
    enviroment: process.env.ELASTIC_APM_ENVIRONMENT = process.env.ELASTIC_APM_ENVIRONMENT || 'ecommercev9dev',
    captureBody: process.env.ELASTIC_APM_CAPTURE_BODY = process.env.ELASTIC_APM_CAPTURE_BODY || 'all',
    captureHeaders: (process.env.ELASTIC_APM_CAPTURE_HEADERS === 'true'),
    logLevel: process.env.ELASTIC_APM_LOG_LEVEL = process.env.ELASTIC_APM_LOG_LEVEL || 'off',
    // Only activate the agent if it's running in production
    active: (process.env.ELASTIC_APM_ACTIVE === 'true')
}
