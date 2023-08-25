import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { FightService } from './fight.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { CreateFightResultDto } from './dto/create-fight-result.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventEntity } from '../../entities/event.entity';
import { FightEntity } from '../../entities/fight.entity';
import { DeleteResultDto } from '../../common/dto/delete-result.dto';


@ApiTags('fight')
@Controller('fight')
export class FightController {
  constructor(private readonly fightService: FightService) {}

  @ApiOperation({ summary: 'Create fight' })
  @ApiResponse({ type: FightEntity })
  @Post()
  create(@Body() createFightDto: CreateFightDto) {
    return this.fightService.create(createFightDto);
  }

  @ApiOperation({ summary: 'Create fight result' })
  @ApiResponse({ type: FightEntity })
  @Post('result')
  fightResult(@Body() createFightResultDto: CreateFightResultDto) {
    return this.fightService.createFightResult(createFightResultDto);
  }

  @ApiOperation({ summary: 'Get all fights' })
  @ApiResponse({ type: FightEntity, isArray: true })
  @Get()
  findAll(@Query() listParams: ListParamsDto) {
    return this.fightService.findAll(listParams);
  }

  @ApiOperation({ summary: 'Get fight by id' })
  @ApiResponse({ type: FightEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fightService.findOne(id);
  }

  @ApiOperation({ summary: 'Update fight details' })
  @ApiResponse({ type: FightEntity })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFightDto: UpdateFightDto,
  ) {
    return this.fightService.update(id, updateFightDto);
  }

  @ApiOperation({ summary: 'Delete fight' })
  @ApiResponse({ type: DeleteResultDto })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fightService.remove(id);
  }
}
