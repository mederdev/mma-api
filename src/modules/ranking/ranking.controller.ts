import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RankingDto } from './dto/ranking.dto';
import { FighterEntity } from '../../entities/fighter.entity';

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @ApiOperation({ summary: 'Get fighters ranking by weight' })
  @ApiResponse({ type: RankingDto })
  @Get('weight/:id')
  ratingByWeight(@Param('id', ParseIntPipe) id: number) {
    return this.rankingService.ratingByWeight(id);
  }

  @ApiOperation({ summary: 'Get fighters rating by P4P' })
  @ApiResponse({ type: RankingDto })
  @Get('pound-for-pound')
  ratingAll(@Query() listParams: ListParamsDto) {
    return this.rankingService.ratingAll(listParams);
  }

  @ApiOperation({ summary: 'Get fighter stats by id' })
  @ApiResponse({ type: RankingDto })
  @Get('fighter/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rankingService.findByFighter(id);
  }
}
