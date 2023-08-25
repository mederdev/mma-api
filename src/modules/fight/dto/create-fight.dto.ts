import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { FightEnum } from '../enums/fight.enum';

export class CreateFightDto {
  @ApiProperty({
    description: 'Fighter id from DB',
  })
  @IsNumber()
  fighterOne: number;

  @ApiProperty({
    description: 'Fighter id from DB',
  })
  @IsNumber()
  fighterTwo: number;

  @ApiProperty()
  @IsEnum(FightEnum)
  underdog: FightEnum;

  @ApiProperty()
  @IsBoolean()
  isMainCard: boolean;

  @ApiProperty({
    description: 'Weight id from DB',
  })
  @IsNumber()
  weight: number;
}
