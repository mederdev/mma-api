import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { WeightService } from './weight.service';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('weight')
@Controller('weight')
export class WeightController {
  constructor(private readonly weightService: WeightService) {}

  @ApiOperation({ summary: 'Create weight class' })
  @Post()
  create(@Body() createWeightDto: CreateWeightDto) {
    return this.weightService.create(createWeightDto);
  }

  @ApiOperation({ summary: 'Get all weight classes' })
  @Get()
  findAll(@Query() listParams: ListParamsDto) {
    return this.weightService.findAll(listParams);
  }

  @ApiOperation({ summary: 'Get weight class by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.weightService.findOne(id);
  }

  @ApiOperation({ summary: 'Update weight class' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWeightDto: UpdateWeightDto,
  ) {
    return this.weightService.update(id, updateWeightDto);
  }

  @ApiOperation({ summary: 'Delete weight class' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.weightService.remove(id);
  }
}
