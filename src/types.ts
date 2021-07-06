export enum GeneratingMethod {
  FourD6DropLowest,
  FourD6DropHighest,
  ThreeD6,
  D20,
}

export type Settings = {
  method: GeneratingMethod;
};

export type Stats = {
  [index: string]: number;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  totalModifier: number;
};
