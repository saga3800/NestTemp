import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IRiskProvider } from "./risk/risk.provider";

import databaseConfig from '../common/configuration/database.config';
import servicesConfig from '../common/configuration/services.config';

@Module({
  imports: [
    //Coinexión a base de datos
    MongooseModule.forRoot(databaseConfig.databse, {
      retryAttempts: 3,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    MongooseModule.forFeature([
      //{ name: model.name, schema: ModelSchema, collection: 'collection_name' },
    ]),
    HttpModule.registerAsync({
      useFactory: () => servicesConfig.httpConfig,
    }),
  ],
  providers: [
     //{ provide: IRiskProvider, useClass: RiskProviderImpl }
  ],
  exports: [
    //interfaces
    IRiskProvider
  ],
})
export class DataProviderModule {}
