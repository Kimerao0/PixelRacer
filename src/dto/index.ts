interface Upgrade {
  name: string;
  description: string;
  cost: number;
  duration: number;
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
