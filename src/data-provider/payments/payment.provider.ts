import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IPaymentProvider {

    abstract consumePaymentReferencesMgmt(data):Promise<any>
}