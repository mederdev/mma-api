import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';

@Controller('fighter')
export class FighterController {
  constructor(private readonly fighterService: FighterService) {}

  @Post()
  create(@Body() createFighterDto: CreateFighterDto) {
    return this.fighterService.create(createFighterDto);
  }

  @Get()
  findAll() {
    return this.fighterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fighterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFighterDto: UpdateFighterDto) {
    return this.fighterService.update(+id, updateFighterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fighterService.remove(+id);
  }
}
