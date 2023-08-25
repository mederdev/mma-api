import { FightResultEnums } from '../../fight/enums/fight-result.enums';

export class UpdateRankingDto {
  type: FightResultEnums;
  winner: boolean;
  isDraw: boolean;
}
