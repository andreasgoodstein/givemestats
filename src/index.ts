enum GeneratingMethod {
  FourD6DropLowest
}

type Stats = {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  totalModifier: number;
};

type Settings = {
  method: GeneratingMethod;
};

const settings: Settings = {
  method: GeneratingMethod.FourD6DropLowest
};

registerEventHandlers();

function registerEventHandlers() {
  const generateStatsButton = document.getElementById("give_stats_button");

  generateStatsButton?.addEventListener("click", giveStatsButtonHandler);
}

function giveStatsButtonHandler() {
  const stats = getNewStats();

  updateElementWithValue("str", stats.str.toString());
  updateElementWithValue("dex", stats.dex.toString());
  updateElementWithValue("con", stats.con.toString());
  updateElementWithValue("int", stats.int.toString());
  updateElementWithValue("wis", stats.wis.toString());
  updateElementWithValue("cha", stats.cha.toString());
  updateElementWithValue("total_mod", stats.totalModifier.toString());
}

function getNewStats(): Stats {
  const newStats = {
    str: generateStat(),
    dex: generateStat(),
    con: generateStat(),
    int: generateStat(),
    wis: generateStat(),
    cha: generateStat(),
    totalModifier: 0
  };

  newStats.totalModifier = calculateTotalModifier(newStats);

  return newStats;
}

function generateStat(): number {
  switch (settings.method) {
    case GeneratingMethod.FourD6DropLowest: {
      return fourD6DropLowest();
    }

    default:
      return 0;
  }
}

function fourD6DropLowest(): number {
  const dieRolls = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)];

  const lowestRoll = Math.min(...dieRolls);

  const sumOfRolls = dieRolls.reduce((sum, roll) => sum + roll, 0) - lowestRoll;

  return sumOfRolls;
}

function rollDie(size: number): number {
  return Math.ceil(Math.random() * size);
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

function updateElementWithValue(identifier: string, value: string) {
  const element = document.getElementById(identifier);

  if (!element) {
    return;
  }

  element.innerText = value;
}
