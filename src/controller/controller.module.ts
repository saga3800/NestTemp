import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MockupController } from './mockup.controller';
import { IMockupService } from './service/mockup.service';
import { MockupService } from './service/impl/mockup.service.impl';


@Module({
  imports: [CoreModule],
  controllers: [MockupController],
  providers: [
    { provide: IMockupService, useClass:  MockupService},
  ],
})
export class ControllerModule { }
