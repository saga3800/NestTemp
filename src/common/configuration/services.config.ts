export default {
  httpConfig: {
    timeout: Number(process.env.HTTP_TIMEOUT || 5000),
  },
  testService: process.env.TEST_SERVICE || 'http:/localhost:8080',
  riskService:process.env.URL_RISK_SERVICE || 'http://ms-risk-orquestadordev.137.116.47.4.nip.io/riesgo/analisis',
  unifiedListsService: process.env.URL_UNIFIED_LISTS || 'http://100.126.21.189:7777/UnifiedLists/V1.0/Rest/UnifiedLists',
  paymentReferencesMgmtService: process.env.PAYMENT_REFERENCES_MGMT_SERVICE || 'http://100.126.21.189:7898/PaymentReferencesMgmt/v1.0/getPaymentReference',
};