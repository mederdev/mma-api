import { Column, Entity, OneToMany } from 'typeorm';
import { MyBaseEntity } from './base/base.entity';
import { FightEntity } from './fight.entity';
import { FighterEntity } from './fighter.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('events')
export class EventEntity extends MyBaseEntity {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({
    type: () => FightEntity,
    isArray: true,
  })
  @OneToMany(() => FightEntity, (fight) => fight.event, { onDelete: 'CASCADE' })
  fights: FightEntity[];

  @ApiProperty()
  @Column({ type: 'jsonb' })
  location: object;

  @ApiProperty()
  @Column({ type: 'date' })
  date: Date;

  @ApiProperty({
    type: () => FighterEntity,
    isArray: true,
  })
  @OneToMany(() => FighterEntity, (fighter) => fighter.event, {
    onDelete: 'SET NULL',
  })
  fighters: FighterEntity[];
}
