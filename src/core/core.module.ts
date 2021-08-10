import { Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { MessageUcimpl } from './use-case/impl/message.uc.impl';
import { IMessageUc } from './use-case/message.uc';

@Module({
  imports: [DataProviderModule],
  providers: [{ provide: IMessageUc, useClass: MessageUcimpl }],
  exports: [IMessageUc],
})
export class CoreModule {}
