import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IRiskProvider {

    abstract consumeRiskMSRisk(data):Promise<any>
}