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
import { FighterService } from './fighter.service';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FightEntity } from '../../entities/fight.entity';
import { FighterEntity } from '../../entities/fighter.entity';
import { UpdateResultDto } from '../../common/dto/update-result.dto';
import { DeleteResultDto } from '../../common/dto/delete-result.dto';

@ApiTags('fighter')
@Controller('fighter')
export class FighterController {
  constructor(private readonly fighterService: FighterService) {}

  @ApiOperation({ summary: 'Create fighter' })
  @ApiResponse({ type: FighterEntity })
  @Post()
  create(@Body() createFighterDto: CreateFighterDto) {
    return this.fighterService.create(createFighterDto);
  }

  @ApiOperation({ summary: 'Get all fighters' })
  @ApiResponse({ type: FighterEntity, isArray: true })
  @Get()
  findAll(@Query() listParams: ListParamsDto) {
    return this.fighterService.findAll(listParams);
  }

  @ApiOperation({ summary: 'Get fighter by id' })
  @ApiResponse({ type: FighterEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fighterService.findOne(id);
  }

  @ApiOperation({ summary: 'Update fighter info' })
  @ApiResponse({ type: UpdateResultDto })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFighterDto: UpdateFighterDto,
  ) {
    return this.fighterService.update(id, updateFighterDto);
  }

  @ApiOperation({ summary: 'Delete fighter' })
  @ApiResponse({ type: DeleteResultDto })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fighterService.remove(id);
  }
}
