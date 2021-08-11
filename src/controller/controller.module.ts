import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MockupController } from './mockup.controller';
import { IMockupService } from './service/mockup.service';
import { MockupService } from './service/impl/mockup.service.impl';
import { MessageController } from './message.controller';
import { IMessageService } from './service/message.service';
import { MessageService } from './service/impl/message.service.impl';
import { TraceabilityController } from './traceability.controller';
import { ITraceabilityService } from './service/traceability.service';
import { TraceabilityService } from './service/impl/traceability.service.impl';

@Module({
  imports: [CoreModule],
  controllers: [MockupController, MessageController, TraceabilityController],
  providers: [
    { provide: IMockupService, useClass: MockupService },
    { provide: IMessageService, useClass: MessageService },
    { provide: ITraceabilityService, useClass: TraceabilityService }
  ],
})
export class ControllerModule {}
