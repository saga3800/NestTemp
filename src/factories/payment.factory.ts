import UtilConfig from '../common/utils/utils';

export class PaymentFactory {
  static requestServicePayment(data) {
    const homologateTypeDoc = UtilConfig.homolgateTypeDoc(data.InfoUser.typeDocument);
    const xmlRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v2="http://www.ericsson.com/esb/data/generico/CommonTypes/v2/" xmlns:v1="http://www.ericsson.com/esb/message/paymentReferencesMgtm/getPaymentReferencesRequest/v1.0">
        <soapenv:Header>
           <v2:headerRequest>
              <!--Optional:-->
              <v2:idBusinessTransaction>1</v2:idBusinessTransaction>
              <v2:idApplication>eCommerce</v2:idApplication>
              <!--Optional:-->
              <v2:target>?</v2:target>
              <!--Optional:-->
              <v2:userApplication></v2:userApplication>
              <!--Optional:-->
              <v2:password></v2:password>
              <v2:startDate>2020-03-16T08:44:25.046-05:00</v2:startDate>
              <!--Optional:-->
              <v2:ipApplication>?</v2:ipApplication>
              <!--Optional:-->
              <v2:idESBTransaction>123</v2:idESBTransaction>
              <!--Optional:-->
              <v2:userSession>?</v2:userSession>
              <v2:channel>eCommerce</v2:channel>
              <!--Optional:-->
              <v2:additionalNode></v2:additionalNode>
           </v2:headerRequest>
        </soapenv:Header>
        <soapenv:Body>
           <v1:GetPaymentReferencesRequest>
              <!--Optional:-->
              <subscriberNumber></subscriberNumber>
              <!--Optional:-->
              <identificationType>${homologateTypeDoc}</identificationType>
              <!--Optional:-->
              <identificationNumber>${data.InfoUser.numberDocument}</identificationNumber>
              <!--Optional:-->
              <accountNumber></accountNumber>
              <!--Optional:-->
              <paymentReference></paymentReference>
           </v1:GetPaymentReferencesRequest>
        </soapenv:Body>
     </soapenv:Envelope>`;

    return xmlRequest;
  }
}
