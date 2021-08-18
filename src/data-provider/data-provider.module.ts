import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '../common/configuration/database.config';
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
    MongooseModule.forRoot(databaseConfig.database, {
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
    ])
  ],
  providers: [
    { provide: IMessageProvider, useClass: MessageProvider },
    { provide: IHttpProvider, useClass: HttpProvider },
    { provide: IHttpPruebaProvider, useClass: HttpPruebaProvider }
  ],
  exports: [IMessageProvider, IHttpPruebaProvider],
})
export class DataProviderModule {}
