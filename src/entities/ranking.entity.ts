import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MyBaseEntity } from './base/base.entity';
import { FighterEntity } from './fighter.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('rankings')
export class RankEntity extends MyBaseEntity {
  @ApiProperty()
  @Column({ default: 0 })
  wins: number;

  @ApiProperty()
  @Column({ default: 0 })
  losses: number;

  @ApiProperty()
  @Column({ default: 0 })
  draws: number;

  @ApiProperty()
  @Column({ default: 0 })
  knockouts: number;

  @ApiProperty()
  @Column({ default: 0 })
  submissions: number;

  @ApiProperty()
  @Column({ default: 0, type: 'float' })
  average: number;

  @OneToOne(() => FighterEntity, (fighter) => fighter.rank, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fighter_id',
  })
  fighter: FighterEntity;

  calculateAverageRank() {
    const totalMatches = this.wins + this.draws + this.losses;
    if (totalMatches > 0) {
      this.average = (this.wins * 2 + this.draws) / totalMatches;
    } else {
      this.average = 0;
    }
  }
}
