import { Stats, GeneratingMethod, Settings } from './types';
import { fourD6DropLowest, fourD6DropHighest, d20 } from './rolling';

export const getNewStats = (settings: Settings): Stats => {
  const newStats = {
    str: generateStat(settings),
    dex: generateStat(settings),
    con: generateStat(settings),
    int: generateStat(settings),
    wis: generateStat(settings),
    cha: generateStat(settings),
    totalModifier: 0
  };

  newStats.totalModifier = calculateTotalModifier(newStats);

  return newStats;
};

function generateStat(settings: Settings): number {
  switch (settings.method) {
    case GeneratingMethod.FourD6DropLowest: {
      return fourD6DropLowest();
    }

    case GeneratingMethod.FourD6DropHighest: {
      return fourD6DropHighest();
    }

    case GeneratingMethod.D20: {
      return d20();
    }

    default:
      return 0;
  }
}

function calculateTotalModifier(stats: Stats): number {
  return (
    calculateModifier(stats.str) +
    calculateModifier(stats.dex) +
    calculateModifier(stats.con) +
    calculateModifier(stats.int) +
    calculateModifier(stats.wis) +
    calculateModifier(stats.cha)
  );
}

function calculateModifier(stat: number): number {
  return Math.floor(stat / 2 - 5);
}

export const getReRoll = (settings: Settings): number => {
  return generateStat(settings);
};
