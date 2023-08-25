import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { MyBaseEntity } from './base/base.entity';
import { WeightEntity } from './weight.entity';
import { FighterEntity } from './fighter.entity';
import { EventEntity } from './event.entity';
import { FightResultEntity } from './fight-result.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('fights')
export class FightEntity extends MyBaseEntity {
  @ApiProperty({
    type: () => FighterEntity,
  })
  @ManyToOne('FighterEntity', { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'fighter_one',
  })
  fighterOne: FighterEntity;

  @ApiProperty({
    type: () => FighterEntity,
  })
  @ManyToOne('FighterEntity', { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'fighter_two',
  })
  fighterTwo: FighterEntity;

  @ApiProperty()
  @Column({
    default: 'none',
  })
  underdog: string;

  @ApiProperty({
    type: () => WeightEntity,
  })
  @ManyToOne('WeightEntity', { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'weight_class',
  })
  weightClass: WeightEntity;

  @ApiProperty()
  @Column({ name: 'is_main_card' })
  isMainCard: boolean;

  @ManyToOne('EventEntity', { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @OneToOne(() => FightResultEntity, (fightResult) => fightResult.fight, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'fight_result_id' })
  fightResult: FightResultEntity;
}
