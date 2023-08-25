import { Module } from '@nestjs/common';
import { FightService } from './fight.service';
import { FightController } from './fight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightEntity } from '../../entities/fight.entity';
import { WeightEntity } from '../../entities/weight.entity';
import { FighterEntity } from '../../entities/fighter.entity';
import { RankingService } from '../ranking/ranking.service';
import { RankEntity } from '../../entities/ranking.entity';
import { FightResultEntity } from '../../entities/fight-result.entity';
import { WeightService } from '../weight/weight.service';
import { FighterService } from '../fighter/fighter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FightResultEntity,
      RankEntity,
      WeightEntity,
      FightEntity,
      FighterEntity,
    ]),
  ],
  controllers: [FightController],
  providers: [FightService, RankingService, WeightService, FighterService],
})
export class FightModule {}
