import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MockupController } from './mockup.controller';
import { IMockupService } from './service/mockup.service';
import { MockupService } from './service/impl/mockup.service.impl';
import { MessageController } from './message.controller';
import { IMessageService } from './service/message.service';
import { MessageService } from './service/impl/message.service.impl';
import { HttpPruebaController } from './http-prueba.controller';
import { IHttpPruebaService } from './service/http-prueba.service';
import { HttpPruebaService } from './service/impl/http-provider.service.impl';

@Module({
  imports: [CoreModule],
  controllers: [MockupController, MessageController, HttpPruebaController],
  providers: [
    { provide: IMockupService, useClass: MockupService },
    { provide: IMessageService, useClass: MessageService },
    { provide: IHttpPruebaService, useClass: HttpPruebaService }
  ],
})
export class ControllerModule {}
