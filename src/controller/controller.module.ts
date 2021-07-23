import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CoreModule } from 'src/core/core.module';

import { RiskController } from './risk.controller';
import { IRiskService } from './service/risks.service';
import { RiskService } from './service/impl/risk.service.impl';

import { IRiskProvider } from '../data-provider/risk/risk.provider';
import { RiskProviderImpl } from '../data-provider/risk/impl/risk.provider.impl';

import { IPaymentProvider } from '../data-provider/payments/payment.provider';
import { PaymentReferencesMgmtImpl } from '../data-provider/payments/impl/payment.provider.impl';

// import { MockupController } from './mockup.controller';
//import { IMockupService } from './service/mockup.service';
//import { MockupService } from './service/impl/mockup.service.impl';

@Module({
  imports: [CoreModule, HttpModule],
  controllers: [RiskController],
  providers: [
    { provide: IRiskService, useClass: RiskService },
    { provide: IRiskProvider, useClass: RiskProviderImpl },
    { provide: IPaymentProvider, useClass: PaymentReferencesMgmtImpl },
  ],
})
export class ControllerModule {}
