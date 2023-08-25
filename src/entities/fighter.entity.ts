import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { MyBaseEntity } from './base/base.entity';
import { RankEntity } from './ranking.entity';
import { EventEntity } from './event.entity';
import { FightResultEntity } from './fight-result.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('fighters')
export class FighterEntity extends MyBaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  weight: number;

  @ApiProperty()
  @Column()
  nation: string;

  @ApiProperty()
  @Column()
  team: string;

  @ApiProperty({
    type: () => RankEntity,
  })
  @OneToOne(() => RankEntity, (rank) => rank.fighter, { eager: true })
  rank: RankEntity;

  @ManyToOne('EventEntity', { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @ApiProperty({
    type: () => FightResultEntity,
    isArray: true,
  })
  @OneToMany(() => FightResultEntity, (fightResult) => fightResult.winner)
  wonFights: FightResultEntity[];

  @ApiProperty({
    type: () => FightResultEntity,
    isArray: true,
  })
  @OneToMany(() => FightResultEntity, (fightResult) => fightResult.loser)
  lostFights: FightResultEntity[];
}
