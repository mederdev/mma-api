import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsObject, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({
    example: [1],
    description: 'Fights id from db',
  })
  @IsArray()
  fights: number[];

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
  date: Date;
}
