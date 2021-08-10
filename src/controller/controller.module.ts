import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MockupController } from './mockup.controller';
import { IMockupService } from './service/mockup.service';
import { MockupService } from './service/impl/mockup.service.impl';
import { MessageController } from './message.controller';
import { IMessageService } from './service/message.service';
import { MessageService } from './service/impl/message.service.impl';

@Module({
  imports: [CoreModule],
  controllers: [MockupController, MessageController],
  providers: [
    { provide: IMockupService, useClass: MockupService },
    { provide: IMessageService, useClass: MessageService },
  ],
})
export class ControllerModule {}
