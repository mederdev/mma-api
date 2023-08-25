import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from './base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('weights')
export class WeightEntity extends MyBaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  from: number;

  @ApiProperty()
  @Column()
  to: number;
}
