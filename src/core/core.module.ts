import { Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IHttpPruebaUc } from './use-case/http-prueba.uc';
import { HttpPruebaUcimpl } from './use-case/impl/http-prueba.uc.impl';
import { MessageUcimpl } from './use-case/impl/message.uc.impl';
import { IMessageUc } from './use-case/message.uc';

@Module({
  imports: [DataProviderModule],
  providers: [
    { provide: IMessageUc, useClass: MessageUcimpl },
    { provide: IHttpPruebaUc, useClass: HttpPruebaUcimpl },
    {
      provide: 'VerifyMessages',
      useFactory: async (messageUC: IMessageUc) => {
        await messageUC.loadMessages();
      },
      inject: [IMessageUc]
    }
  ],
  exports: [IMessageUc, IHttpPruebaUc],
})
export class CoreModule {}
