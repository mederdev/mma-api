import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsObject } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({
    example: {
      lat: 12.231,
      long: 12.231,
    },
  })
  @IsObject()
  location: object;

  @ApiProperty()
  @IsDateString()
  date: string;
}
