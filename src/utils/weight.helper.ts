import { WeightEntity } from '../entities/weight.entity';

export const weightCheck = (
  weight: WeightEntity,
  fighterOne: number,
  fighterTwo: number,
) => {
  return (
    weight.from <= fighterOne &&
    weight.to >= fighterOne &&
    weight.from <= fighterTwo &&
    weight.to >= fighterTwo
  );
};
