import { ApiProperty } from '@nestjs/swagger';

export class UpdateResult {
  @ApiProperty()
  updated: boolean;
}
