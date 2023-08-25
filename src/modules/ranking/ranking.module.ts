import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankEntity } from '../../entities/ranking.entity';
import { WeightEntity } from '../../entities/weight.entity';
import { WeightService } from '../weight/weight.service';
import { FighterService } from '../fighter/fighter.service';
import { FighterEntity } from '../../entities/fighter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RankEntity, WeightEntity, FighterEntity])],
  controllers: [RankingController],
  providers: [RankingService, WeightService, FighterService],
})
export class RankingModule {}
