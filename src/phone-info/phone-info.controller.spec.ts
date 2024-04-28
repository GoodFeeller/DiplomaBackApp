import { Test, TestingModule } from '@nestjs/testing';
import { PhoneInfoController } from './phone-info.controller';

describe('PhoneInfoController', () => {
  let controller: PhoneInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneInfoController],
    }).compile();

    controller = module.get<PhoneInfoController>(PhoneInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
