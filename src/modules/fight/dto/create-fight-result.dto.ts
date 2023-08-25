import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { FightResultEnums } from '../enums/fight-result.enums';
import { FightEnum } from '../enums/fight.enum';

export class CreateFightResultDto {
  @ApiProperty({
    description: 'Fight id from DB',
  })
  @IsNumber()
  fightId: number;

  @ApiProperty({
    example: 'fighterOne',
  })
  @IsEnum(FightEnum)
  winner: FightEnum;

  @ApiProperty({
    example: 'fighterTwo',
  })
  @IsEnum(FightEnum)
  loser: FightEnum;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDraw: boolean;

  @ApiProperty({
    example: 'submissions',
  })
  @IsEnum(FightResultEnums)
  @IsOptional()
  type: FightResultEnums;
}
