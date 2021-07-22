export default {
  httpConfig: {
    timeout: Number(process.env.HTTP_TIMEOUT || 5000),
  },
  testService: process.env.TEST_SERVICE || 'http:/localhost:8080',
  riskService:process.env.URL_RISK_SERVICE || 'http://ms-risk-orquestadordev.137.116.47.4.nip.io/riesgo/analisis',
  unifiedListsService: process.env.URL_UNIFIED_LISTS || 'http://172.24.232.150:8010/UnifiedLists/V1.0/Rest/UnifiedLists'
};