import { Module } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { FighterController } from './fighter.controller';

@Module({
  controllers: [FighterController],
  providers: [FighterService]
})
export class FighterModule {}
