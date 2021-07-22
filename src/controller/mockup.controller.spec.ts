import { Test, TestingModule } from '@nestjs/testing';
import { MockupController } from './mockup.controller';
import { MockupService } from './service/impl/mockup.service.impl';
import { IMockupService } from './service/mockup.service';

describe('MockupController', () => {
  let controller: MockupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockupController],
      providers: [MockupService],
    }).compile();

    controller = module.get<MockupController>(MockupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
