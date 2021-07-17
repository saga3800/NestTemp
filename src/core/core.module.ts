import { Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';

@Module({
    imports: [
        DataProviderModule,
      ],
      providers: [
        //{ provide: interface, useClass: implement use case },
      ],
      exports: [
        //interface
      ]
})
export class CoreModule {}
