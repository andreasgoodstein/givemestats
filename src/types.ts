export enum GeneratingMethod {
  FourD6DropLowest,
  FourD6DropHighest,
  D20
}

export type Settings = {
  method: GeneratingMethod;
};

export type Stats = {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  totalModifier: number;
};
