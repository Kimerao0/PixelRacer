export const upgrades = [
  "hyper-speed",
  "suspensions",
  "precision",
  "rocket",
  "shield",
  "repair30",
  "repair60",
] as const;

// get the type from the upgrades array
export type UpgradeName = (typeof upgrades)[number];

export interface Upgrade {
  name: UpgradeName;
  description: string;
  quantity: number;
}

export interface RaceCar {
  name: string;
  image: string;
  stats: {
    topSpeed: number;
    maneuverability: number;
    offroad: number;
    durability: number;
    acceleration: number;
  };
  carPrice: number;
  status: number;
  activeUpgrades: Upgrade[];
}

export interface RaceTeam {
  name: string;
  credits: number;
  cars: RaceCar[];
  upgrades: Upgrade[];
  punti: number;
}
