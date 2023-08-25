import { ApiProperty } from '@nestjs/swagger';

export class DeleteResultDto {
  @ApiProperty()
  deleted: boolean;
}
