export const fourD6DropLowest = (): number => {
  const dieRolls = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)];

  const lowestRoll = Math.min(...dieRolls);

  const sumOfRolls = dieRolls.reduce((sum, roll) => sum + roll, 0) - lowestRoll;

  return sumOfRolls;
};

export const fourD6DropHighest = (): number => {
  const dieRolls = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)];

  const highestRoll = Math.max(...dieRolls);

  const sumOfRolls =
    dieRolls.reduce((sum, roll) => sum + roll, 0) - highestRoll;

  return sumOfRolls;
};

export const d20 = (): number => {
  return rollDie(20);
};

function rollDie(size: number): number {
  return Math.ceil(Math.random() * size);
}
