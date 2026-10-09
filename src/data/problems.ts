import { Problem } from '../types';
import { LEVEL1_PROBLEMS } from './problems/level1';
import { LEVEL2_PROBLEMS } from './problems/level2';
import { LEVEL3_PROBLEMS } from './problems/level3';
import { LEVEL4_PROBLEMS } from './problems/level4';
import { LEVEL5_PROBLEMS } from './problems/level5';

export const PROBLEMS_DATA: Problem[] = [
  ...LEVEL1_PROBLEMS,
  ...LEVEL2_PROBLEMS,
  ...LEVEL3_PROBLEMS,
  ...LEVEL4_PROBLEMS,
  ...LEVEL5_PROBLEMS,
];

export {
  LEVEL1_PROBLEMS,
  LEVEL2_PROBLEMS,
  LEVEL3_PROBLEMS,
  LEVEL4_PROBLEMS,
  LEVEL5_PROBLEMS,
};
