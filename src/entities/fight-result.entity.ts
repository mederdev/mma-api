import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { MyBaseEntity } from './base/base.entity';
import { FighterEntity } from './fighter.entity';
import { FightEntity } from './fight.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('fights_result')
export class FightResultEntity extends MyBaseEntity {
  @ApiProperty({
    type: () => FightEntity,
  })
  @OneToOne('FightEntity')
  @JoinColumn({
    name: 'fight_id',
  })
  fight: FightEntity;

  @ApiProperty({
    type: () => FighterEntity,
  })
  @ManyToOne(() => FighterEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'winner_id' })
  winner: FighterEntity;

  @ApiProperty({
    type: () => FighterEntity,
  })
  @ManyToOne(() => FighterEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'loser_id' })
  loser: FighterEntity;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column({ type: 'bool', default: false })
  isDraw: boolean;
}
