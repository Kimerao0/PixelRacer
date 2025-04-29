interface Upgrade {
  name: string;
  description: string;
  cost: number;
  duration: number;
}

interface RaceCar {
  name: string;
  image: string;
  stats: {
    topSpeed: number;
    maneuverability: number;
    durability: number;
    acceleration: number;
    offroad: number;
  };
  status: number;
  activeUpgrades: Upgrade[];
}

export interface RaceTeam {
  name: string;
  credits: number;
  cars: RaceCar[];
  upgrades: Upgrade[];
}
