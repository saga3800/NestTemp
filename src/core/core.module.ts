import { CacheModule, Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IHttpPruebaUc } from './use-case/http-prueba.uc';
import { HttpPruebaUcimpl } from './use-case/impl/http-prueba.uc.impl';
import { MessageUcimpl } from './use-case/impl/message.uc.impl';
import { TraceabilityUcimpl } from './use-case/impl/traceability.uc.impl';
import { IMessageUc } from './use-case/message.uc';
import { ITraceabilityUc } from './use-case/traceability.uc';

@Module({
  imports: [DataProviderModule, CacheModule.register()],
  providers: [
    { provide: IMessageUc, useClass: MessageUcimpl },
    { provide: ITraceabilityUc, useClass: TraceabilityUcimpl },
    { provide: IHttpPruebaUc, useClass: HttpPruebaUcimpl },
    {
      provide: 'VerifyMessages',
      useFactory: async (messageUC: IMessageUc) => {
        await messageUC.loadMessages();
      },
      inject: [IMessageUc]
    }
  ],
  exports: [IMessageUc, ITraceabilityUc, IHttpPruebaUc],
})
export class CoreModule {}
