import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../../entities/event.entity';
import { Repository } from 'typeorm';
import { FightService } from '../fight/fight.service';
import { FighterService } from '../fighter/fighter.service';
import { ListParamsDto } from '../../common/dto/list-params.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly fightService: FightService,
    private readonly fighterService: FighterService,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const fights = await this.fightService.getByIds(createEventDto.fights);

    if (!fights.length) {
      throw new NotFoundException('Fights not found!');
    }

    const event = this.eventRepository.create({
      fights,
      fighters: fights.flatMap((fight) => [fight.fighterOne, fight.fighterTwo]),
      title: createEventDto.title,
      location: createEventDto.location,
      date: new Date(),
    });

    return this.eventRepository.save(event);
  }

  findAll(listParams: ListParamsDto) {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.fights', 'fights')
      .leftJoinAndSelect('event.fighters', 'fighters')
      .limit(listParams.limit)
      .skip(listParams.countOffset())
      .getMany();
  }

  findOne(id: number) {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.fights', 'fights')
      .leftJoinAndSelect('event.fighters', 'fighters')
      .where({ id })
      .getOne();
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const result = await this.eventRepository.update(
      {
        id,
      },
      updateEventDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException('Event not found');
    }

    return {
      updated: true,
    };
  }

  async remove(id: number) {
    const result = await this.eventRepository.delete({
      id,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Event not found!');
    }

    return {
      deleted: true,
    };
  }
}
