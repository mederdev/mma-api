import { FighterEntity } from '../../../entities/fighter.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RankingDto {
  @ApiProperty({
    example: 'flyweight',
  })
  weightClass: string;

  @ApiProperty({
    type: () => FighterEntity,
  })
  ranking: FighterEntity[];
}
