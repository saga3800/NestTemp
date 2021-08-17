import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '../common/configuration/database.config';
import { IHttpProvider } from './http.provider';
import { IMessageProvider } from './message.provider';
import { MessageModel, MessageSchema } from './model/message.model';
import { TraceabilityModel, TraceabilitySchema} from './model/traceability.model';
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
    ])
  ],
  providers: [
    { provide: IMessageProvider, useClass: MessageProvider },
    { provide: ITraceabilityProvider, useClass: TraceabilityProvider },
    { provide: IHttpProvider, useClass: HttpProvider }
  ],
  exports: [IMessageProvider, ITraceabilityProvider],
})
export class DataProviderModule {}
