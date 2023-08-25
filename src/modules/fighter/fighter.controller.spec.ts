import { Test, TestingModule } from '@nestjs/testing';
import { FighterController } from './fighter.controller';
import { FighterService } from './fighter.service';

describe('FighterController', () => {
  let controller: FighterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FighterController],
      providers: [FighterService],
    }).compile();

    controller = module.get<FighterController>(FighterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
