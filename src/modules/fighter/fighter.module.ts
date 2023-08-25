import { Module } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { FighterController } from './fighter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FighterEntity } from '../../entities/fighter.entity';
import { RankEntity } from '../../entities/ranking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    FighterEntity,
    RankEntity
  ])],
  controllers: [FighterController],
  providers: [FighterService]
})
export class FighterModule {}
