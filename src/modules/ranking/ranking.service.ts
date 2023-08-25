import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RankEntity } from '../../entities/ranking.entity';
import { Repository } from 'typeorm';
import { FighterEntity } from '../../entities/fighter.entity';
import { WeightService } from '../weight/weight.service';
import { FighterService } from '../fighter/fighter.service';
import { ListParamsDto } from '../../common/dto/list-params.dto';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(RankEntity)
    private readonly rankRepository: Repository<RankEntity>,
    private readonly weightService: WeightService,
    private readonly fighterService: FighterService,
  ) {}

  async updateRank(fighter: FighterEntity, data: UpdateRankingDto) {
    const rank = await this.rankRepository
      .createQueryBuilder()
      .where('fighter_id = :id', { id: fighter.id })
      .getOne();

    if (data.isDraw) {
      rank.draws += 1;
    } else {
      if (data.winner) {
        rank[data.type] += 1;
        rank.wins += 1;
      } else {
        rank.losses += 1;
      }
    }

    rank.calculateAverageRank();

    return this.rankRepository.save(rank);
  }
  async ratingByWeight(id: number) {
    const weightClass = await this.weightService.findOne(id);

    if (!weightClass) {
      throw new NotFoundException('Weight class not found!');
    }

    const fighters = await this.fighterService.ratingByWeight(weightClass);

    return {
      weightClass: weightClass.name,
      ranking: fighters,
    };
  }

  async ratingAll(listParams: ListParamsDto) {
    const fighters = await this.fighterService.ratingAll(listParams);

    return {
      weightClass: 'Pound of pound',
      ranking: fighters,
    };
  }

  async findByFighter(id: number) {
    const fighterRank = await this.rankRepository
      .createQueryBuilder('rank')
      .where('rank.fighter_id = :id', { id })
      .getOne();

    if (!fighterRank) {
      throw new NotFoundException('Fighter rank not found!');
    }

    return {
      fighterId: id,
      ranking: fighterRank,
    };
  }
}
