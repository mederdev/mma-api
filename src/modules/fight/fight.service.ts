import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { weightCheck } from '../../utils/weight.helper';
import { RankingService } from '../ranking/ranking.service';
import { FightResultEntity } from '../../entities/fight-result.entity';
import { FightEntity } from '../../entities/fight.entity';
import { WeightEntity } from '../../entities/weight.entity';
import { FighterEntity } from '../../entities/fighter.entity';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { CreateFightResultDto } from './dto/create-fight-result.dto';

@Injectable()
export class FightService {
  constructor(
    @InjectRepository(FightEntity)
    private readonly fightRepository: Repository<FightEntity>,
    @InjectRepository(WeightEntity)
    private readonly weightRepository: Repository<WeightEntity>,
    @InjectRepository(FighterEntity)
    private readonly fighterRepository: Repository<FighterEntity>,
    @InjectRepository(FightResultEntity)
    private readonly fightResultRepository: Repository<FightResultEntity>,
    private readonly rankService: RankingService,
  ) {}
  async create(createFightDto: CreateFightDto) {
    const weightClass = await this.weightRepository.findOneBy({
      id: createFightDto.weight,
    });

    if (!weightClass) {
      throw new NotFoundException('Weight class not found');
    }

    const [fighter_one, fighter_two] = await Promise.all([
      this.fighterRepository.findOneBy({ id: createFightDto.fighterOne }),
      this.fighterRepository.findOneBy({ id: createFightDto.fighterTwo }),
    ]);

    if (!fighter_one || !fighter_two) {
      throw new NotFoundException('Fighters not found!');
    }

    const isWeight = weightCheck(
      weightClass,
      fighter_one.weight,
      fighter_two.weight,
    );

    if (!isWeight) {
      throw new BadRequestException('Wrong weight classes!');
    }

    const fight = this.fightRepository.create({
      fighterOne: fighter_one,
      fighterTwo: fighter_two,
      underdog: createFightDto.underdog,
      isMainCard: createFightDto.isMainCard,
      weightClass,
    });

    return this.fightRepository.save(fight);
  }

  async createFightResult(resultDto: CreateFightResultDto) {
    const fight = await this.findOne(resultDto.fightId);

    if (!fight) {
      throw new NotFoundException('Fight not found!');
    }

    const [winner, loser] = [fight[resultDto.winner], fight[resultDto.loser]];

    await Promise.all([
      this.rankService.updateRank(winner, {
        type: resultDto.type,
        winner: true,
        isDraw: !!resultDto.isDraw,
      }),
      this.rankService.updateRank(loser, {
        type: resultDto.type,
        winner: false,
        isDraw: !!resultDto.isDraw,
      }),
    ]);

    const fightResult = this.fightResultRepository.create({
      fight,
      winner,
      loser,
      type: resultDto.type,
    });

    if (resultDto.isDraw) {
      fightResult.type = 'draw';
      fightResult.winner = null;
      fightResult.loser = null;
      fightResult.isDraw = true;
    }

    fight.fightResult = await this.fightResultRepository.save(fightResult);

    return this.fightRepository.save(fight);
  }

  findAll(listParams: ListParamsDto) {
    return this.fightRepository
      .createQueryBuilder('fight')
      .leftJoinAndSelect('fight.fighterOne', 'fighterOne')
      .leftJoinAndSelect('fight.fighterTwo', 'fighterTwo')
      .leftJoinAndSelect('fight.weightClass', 'weight')
      .where('fight.fight_result_id is NULL')
      .limit(listParams.limit)
      .skip(listParams.countOffset())
      .getMany();
  }
  async findOne(id: number) {
    const fight = await this.fightRepository
      .createQueryBuilder('fight')
      .leftJoinAndSelect('fight.fighterOne', 'fighterOne')
      .leftJoinAndSelect('fight.fighterTwo', 'fighterTwo')
      .leftJoinAndSelect('fight.weightClass', 'weight')
      .where({ id })
      .getOne();

    if (!fight) {
      throw new NotFoundException('Fight not found!');
    }

    return fight;
  }

  async update(id: number, updateFightDto: UpdateFightDto) {
    const [fighter_one, fighter_two] = await Promise.all([
      this.fighterRepository.findOneBy({ id: updateFightDto.fighterOne }),
      this.fighterRepository.findOneBy({ id: updateFightDto.fighterTwo }),
    ]);

    const fight = await this.fightRepository.findOne({
      where: {
        id,
      },
      relations: ['weight', 'fighterOne', 'fighterTwo'],
    });

    if (!fighter_one && !fighter_two) {
      throw new NotFoundException('Fighters not found!');
    }

    const isWeight = weightCheck(
      fight.weightClass,
      fighter_one?.weight || fight.fighterOne.weight,
      fighter_two?.weight || fight.fighterTwo.weight,
    );

    if (!isWeight) {
      throw new BadRequestException('Wrong weight classes!');
    }
    if (fighter_one) {
      fight.fighterOne = fighter_one;
    }
    if (fighter_two) {
      fight.fighterTwo = fighter_two;
    }

    return this.fightRepository.save(fight);
  }

  async getByIds(ids: number[]) {
    return this.fightRepository
      .createQueryBuilder('fight')
      .leftJoinAndSelect('fight.fighterOne', 'fighterOne')
      .leftJoinAndSelect('fight.fighterTwo', 'fighterTwo')
      .leftJoinAndSelect('fight.weightClass', 'weight')
      .where('fight.id IN (:...ids)', { ids })
      .getMany();
  }

  async remove(id: number) {
    const result = await this.fightRepository.delete({
      id,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Fight not found!');
    }

    return {
      deleted: true,
    };
  }
}
