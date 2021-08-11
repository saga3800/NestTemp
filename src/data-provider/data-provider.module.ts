import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MESSAGE } from 'src/common/configuration/messages/message-config';
import databaseConfig from '../common/configuration/database.config';
import servicesConfig from '../common/configuration/services.config';
import { IHttpProvider } from './http.provider';
import { IMessageProvider } from './message.provider';
import { MessageModel, MessageSchema } from './model/message.model';
import {
  TraceabilityModel,
  TraceabilitySchema,
} from './model/traceability.model';
import { HttpProvider } from './provider/http.provider.impl';
import { MessageProvider } from './provider/message.provider.impl';
import { TraceabilityProvider } from './provider/traceability.provider.impl';
import { ITraceabilityProvider } from './traceability.provider';

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
      },
      {
        name: TraceabilityModel.name,
        schema: TraceabilitySchema,
        collection: 'coll_traceability',
      },
    ]),
    HttpModule.registerAsync({
      useFactory: () => servicesConfig.httpConfig,
    }),
  ],
  providers: [
    { provide: IMessageProvider, useClass: MessageProvider },
    { provide: ITraceabilityProvider, useClass: TraceabilityProvider },
    { provide: IHttpProvider, useClass: HttpProvider },
    {
      provide: 'VerifyMessages',
      useFactory: async (messageProvider: IMessageProvider) => {
        const num = await messageProvider.getTotal({});
        if (num == 0) {
          // Si no hay mensajes en bd, se crean los mensajes por defecto
          await messageProvider.createMessages(MESSAGE);
        }
      },
      inject: [IMessageProvider]
    },
  ],
  exports: [IMessageProvider, ITraceabilityProvider, 'VerifyMessages'],
})
export class DataProviderModule {}
