import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ListParamsDto {
  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }: { value: number }) =>
    value > 0 && value < 100000 ? value : 1,
  )
  page = 1;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }: { value: number }) =>
    value > 0 && value < 100 ? value : 20,
  )
  limit = 10;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @Transform(({ value }) => (value === 'desc' ? 'DESC' : 'ASC'))
  @IsOptional()
  order: 'ASC' | 'DESC' = 'ASC';

  public countOffset(): number {
    return (this.page - 1) * this.limit;
  }
}
