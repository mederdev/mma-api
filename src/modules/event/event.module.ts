import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../../entities/event.entity';
import { FighterService } from '../fighter/fighter.service';
import { FightService } from '../fight/fight.service';
import { FighterEntity } from '../../entities/fighter.entity';
import { FightEntity } from '../../entities/fight.entity';
import { RankEntity } from '../../entities/ranking.entity';
import { WeightEntity } from '../../entities/weight.entity';
import { RankingService } from '../ranking/ranking.service';
import { FightResultEntity } from '../../entities/fight-result.entity';
import { WeightService } from '../weight/weight.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      FighterEntity,
      FightEntity,
      RankEntity,
      WeightEntity,
      FightResultEntity,
    ]),
  ],
  controllers: [EventController],
  providers: [EventService, FighterService, FightService, RankingService, WeightService],
})
export class EventModule {}
