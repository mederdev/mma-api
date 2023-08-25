import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WeightEntity } from '../../entities/weight.entity';
import { Repository } from 'typeorm';
import { ListParamsDto } from '../../common/dto/list-params.dto';

@Injectable()
export class WeightService {
  constructor(
    @InjectRepository(WeightEntity)
    private readonly weightRepository: Repository<WeightEntity>,
  ) {}
  async create(createWeightDto: CreateWeightDto) {
    let weight = await this.weightRepository.findOneBy({
      name: createWeightDto.name,
    });

    if (weight) {
      throw new BadRequestException('Weight class already exis!');
    }

    weight = this.weightRepository.create({
      name: createWeightDto.name,
      from: createWeightDto.from,
      to: createWeightDto.to,
    });

    return this.weightRepository.save(weight);
  }

  findAll(listParams: ListParamsDto) {
    return this.weightRepository
      .createQueryBuilder()
      .limit(listParams.limit)
      .skip(listParams.countOffset())
      .getMany();
  }

  findOne(id: number) {
    return this.weightRepository.findOneBy({ id });
  }

  async update(id: number, updateWeightDto: UpdateWeightDto) {
    const result = await this.weightRepository.update(
      {
        id,
      },
      updateWeightDto,
    );

    if (result.affected === 0) {
      throw new BadRequestException(
        'Nothing to update or weight class not found!',
      );
    }

    return {
      updated: true,
    };
  }

  async remove(id: number) {
    const result = await this.weightRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('Weight class not found!');
    }

    return {
      deleted: true,
    };
  }
}
