export default{
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME || 'ms-template-nestjs',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL || 'http://100.123.251.89:8200',
    environment: process.env.ELASTIC_APM_ENVIRONMENT || 'ecommercev9dev',
    // Only activate the agent if it's running in production
    active: (process.env.NODE_ENV == 'production'),
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN
}
