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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventEntity } from '../../entities/event.entity';
import { UpdateResultDto } from '../../common/dto/update-result.dto';
import { DeleteResultDto } from '../../common/dto/delete-result.dto';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Create event with fights' })
  @ApiResponse({ type: EventEntity })
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ type: EventEntity, isArray: true })
  @Get()
  findAll(@Query() listParams: ListParamsDto) {
    return this.eventService.findAll(listParams);
  }

  @ApiOperation({ summary: 'Get event by id' })
  @ApiResponse({ type: EventEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.findOne(id);
  }

  @ApiOperation({ summary: 'Update event' })
  @ApiResponse({ type: UpdateResultDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  @ApiOperation({ summary: 'Delete event' })
  @ApiResponse({ type: DeleteResultDto })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.remove(id);
  }
}
