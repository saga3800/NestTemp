import { Test, TestingModule } from '@nestjs/testing';
import { MockupService } from './mockup.service.impl';

describe('MockupService', () => {
  let service: MockupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockupService],
    }).compile();

    service = module.get<MockupService>(MockupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
