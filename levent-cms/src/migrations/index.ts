import * as migration_20260202_135520 from './20260202_135520';

export const migrations = [
  {
    up: migration_20260202_135520.up,
    down: migration_20260202_135520.down,
    name: '20260202_135520'
  },
];
