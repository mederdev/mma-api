import { Module } from '@nestjs/common';
import { WeightService } from './weight.service';
import { WeightController } from './weight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightEntity } from '../../entities/weight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeightEntity])],
  controllers: [WeightController],
  providers: [WeightService],
})
export class WeightModule {}
