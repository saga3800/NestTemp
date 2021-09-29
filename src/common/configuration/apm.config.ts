'use strict';

process.env.ELASTIC_APM_SERVICE_NAME = process.env.ELASTIC_APM_SERVICE_NAME || 'ms-template-nestjs';
process.env.ELASTIC_APM_SERVER_URL = process.env.ELASTIC_APM_SERVER_URL || 'http://100.123.251.89:8200';
process.env.ELASTIC_APM_ENVIRONMENT = process.env.ELASTIC_APM_ENVIRONMENT || 'EcommerceV9Dev';
process.env.ELASTIC_APM_CAPTURE_BODY = process.env.ELASTIC_APM_CAPTURE_BODY || 'all';
process.env.ELASTIC_APM_CAPTURE_HEADERS = process.env.ELASTIC_APM_CAPTURE_HEADERS || 'true';
process.env.ELASTIC_APM_LOG_LEVEL = process.env.ELASTIC_APM_LOG_LEVEL || 'off';
// Only activate the agent if it's running in production
process.env.ELASTIC_APM_ACTIVE = process.env.ELASTIC_APM_ACTIVE || 'true';

