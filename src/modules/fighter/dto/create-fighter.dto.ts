import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFighterDto {
  @ApiProperty({
    example: 'Habib',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 65,
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    example: 'Russia',
  })
  @IsString()
  nation: string;

  @ApiProperty({
    example: 'Team Spirit',
  })
  @IsString()
  team: string;
}
