import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateWeightDto {
  @ApiProperty({
    example: 'lightweight',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 65,
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    example: 70,
  })
  @IsNumber()
  to: number;
}
