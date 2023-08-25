import { ApiProperty } from '@nestjs/swagger';

export class DeleteResult {
  @ApiProperty()
  deleted: boolean;
}
