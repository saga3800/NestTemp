import { CacheModule, Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IHttpPruebaUc } from './use-case/http-prueba.uc';
import { HttpPruebaUcimpl } from './use-case/impl/http-prueba.uc.impl';
import { MessageUcimpl } from './use-case/impl/message.uc.impl';
import { IMessageUc } from './use-case/message.uc';
import { ParamUcimpl } from './use-case/resource/impl/param.resource.uc.impl';
import { ServiceErrorUcimpl } from './use-case/resource/impl/service-error.resource.uc.impl';
import { IParamUc } from './use-case/resource/param.resource.uc';
import { IServiceErrorUc } from './use-case/resource/service-error.resource.uc';

@Module({
  imports: [CacheModule.register(),DataProviderModule],
  providers: [
    { provide: IMessageUc, useClass: MessageUcimpl },
    { provide: IHttpPruebaUc, useClass: HttpPruebaUcimpl },
    { provide: IParamUc, useClass: ParamUcimpl },
    { provide: IServiceErrorUc, useClass: ServiceErrorUcimpl },
    {
      provide: 'VerifyParams',
      useFactory: async (paramUC: IParamUc) => {
        await paramUC.loadParams();
      },
      inject: [IParamUc]
    },
  ],
  
  exports: [IMessageUc, IHttpPruebaUc, IParamUc, IServiceErrorUc],
})
export class CoreModule {}
