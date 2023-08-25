import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
export class UpdateFightDto {
  @ApiProperty({
    description: 'Fighter id from DB',
  })
  @IsNumber()
  @IsOptional()
  fighterOne: number;

  @ApiProperty({
    description: 'Fighter id from DB',
  })
  @IsNumber()
  @IsOptional()
  fighterTwo: number;
}
