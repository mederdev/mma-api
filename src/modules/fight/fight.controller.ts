import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FightService } from './fight.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';

@Controller('fight')
export class FightController {
  constructor(private readonly fightService: FightService) {}

  @Post()
  create(@Body() createFightDto: CreateFightDto) {
    return this.fightService.create(createFightDto);
  }

  @Get()
  findAll() {
    return this.fightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fightService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFightDto: UpdateFightDto) {
    return this.fightService.update(+id, updateFightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fightService.remove(+id);
  }
}
