import { Module } from '@nestjs/common';
import { FighterModule } from './modules/fighter/fighter.module';
import { EventModule } from './modules/event/event.module';
import { RankingModule } from './modules/ranking/ranking.module';
import { FightModule } from './modules/fight/fight.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './config/db.config';
import { WeightModule } from './modules/weight/weight.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DbConfig.getConfig()),
    FighterModule,
    EventModule,
    RankingModule,
    FightModule,
    WeightModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
