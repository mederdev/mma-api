import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFighterDto {
  @ApiProperty({
    example: 'Habib',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 65,
  })
  @IsNumber()
  @IsOptional()
  weight: number;

  @ApiProperty({
    example: 'Russia',
  })
  @IsString()
  @IsOptional()
  nation: string;

  @ApiProperty({
    example: 'Team Spirit',
  })
  @IsString()
  @IsOptional()
  team: string;
}
