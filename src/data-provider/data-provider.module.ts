import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '../common/configuration/database.config';
import servicesConfig from '../common/configuration/services.config';
import { IHttpPruebaProvider } from './http-prueba.provider';
import { IHttpProvider } from './http.provider';
import { IMessageProvider } from './message.provider';
import { MessageModel, MessageSchema } from './model/message.model';
import { HttpPruebaProvider } from './provider/http-prueba.provider.impl';
import { HttpProvider } from './provider/http.provider.impl';
import { MessageProvider } from './provider/message.provider.impl';

@Module({
  imports: [
    //Conexión a base de datos
    MongooseModule.forRoot(databaseConfig.databse, {
      retryAttempts: 3,
      useCreateIndex: true,
      useFindAndModify: false,
      autoCreate: true,
    }),
    MongooseModule.forFeature([
      {
        name: MessageModel.name,
        schema: MessageSchema,
        collection: 'coll_message',
      }
    ]),
    HttpModule.registerAsync({
      useFactory: () => servicesConfig.httpConfig,
    }),
  ],
  providers: [
    { provide: IMessageProvider, useClass: MessageProvider },
    { provide: IHttpProvider, useClass: HttpProvider },
    { provide: IHttpPruebaProvider, useClass: HttpPruebaProvider }
  ],
  exports: [IMessageProvider, IHttpPruebaProvider],
})
export class DataProviderModule {}
