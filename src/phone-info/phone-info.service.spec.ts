import { Test, TestingModule } from '@nestjs/testing';
import { PhoneInfoService } from './phone-info.service';

describe('PhoneInfoService', () => {
  let service: PhoneInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneInfoService],
    }).compile();

    service = module.get<PhoneInfoService>(PhoneInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
