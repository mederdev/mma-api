import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FighterEntity } from '../../entities/fighter.entity';
import { Repository } from 'typeorm';
import { RankEntity } from '../../entities/ranking.entity';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { WeightEntity } from '../../entities/weight.entity';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(FighterEntity)
    private readonly fighterRepository: Repository<FighterEntity>,
    @InjectRepository(RankEntity)
    private readonly rankRepository: Repository<RankEntity>,
  ) {}
  async create(createFighterDto: CreateFighterDto) {
    let user = await this.getByName(createFighterDto.name);

    if (user) {
      throw new BadRequestException('User with same name already exist!');
    }

    user = this.fighterRepository.create(createFighterDto);
    user = await this.fighterRepository.save(user);

    const userRank = await this.rankRepository.create();
    userRank.fighter = user;

    await this.rankRepository.save(userRank);
    return user;
  }

  async getByName(name: string) {
    return this.fighterRepository.findOne({ where: { name } });
  }
  async findAll(listParams: ListParamsDto) {
    return this.fighterRepository
      .createQueryBuilder('fighter')
      .leftJoinAndSelect('fighter.rank', 'rank')
      .limit(listParams.limit)
      .skip(listParams.countOffset())
      .getMany();
  }

  async ratingByWeight(weightClass: WeightEntity) {
    return this.fighterRepository
      .createQueryBuilder('fighter')
      .leftJoinAndSelect('fighter.rank', 'rank')
      .where('fighter.weight <= :to AND fighter.weight >= :from', {
        to: weightClass.to,
        from: weightClass.from,
      })
      .orderBy('rank.average', 'DESC')
      .getMany();
  }

  async ratingAll(listParams: ListParamsDto) {
    return this.fighterRepository
      .createQueryBuilder('fighter')
      .leftJoinAndSelect('fighter.rank', 'rank')
      .orderBy('rank.average', 'DESC')
      .limit(listParams.limit)
      .skip(listParams.countOffset())
      .getMany();
  }

  async findOne(id: number) {
    const fighter = await this.fighterRepository.findOne({
      where: {
        id,
      },
      relations: ['rank'],
    });

    if (!fighter) {
      throw new NotFoundException('Fighter not found!');
    }

    return fighter;
  }

  async update(id: number, updateFighterDto: UpdateFighterDto) {
    const fighter = await this.fighterRepository.update(
      {
        id,
      },
      updateFighterDto,
    );

    if (fighter.affected === 0) {
      throw new NotFoundException('Fighter not found');
    }

    return {
      updated: true,
    };
  }

  async remove(id: number) {
    const fighter = await this.fighterRepository
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();

    if (fighter.affected === 0) {
      throw new NotFoundException('Fighter not found');
    }

    return {
      deleted: true,
    };
  }
}
