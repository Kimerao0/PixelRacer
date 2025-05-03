import { RaceTrack, Terrain } from "../data/tracks";
import { RaceCar, RaceTeam } from "../dto";
import { CarRaceState } from "../sections/RaceSection/RaceHandler";

export function calculateTopSpeed(topSpeed: number, limiter: number): number {
  const ratio = limiter / 700;
  const finalSpeed = topSpeed * ratio;
  const roundedSpeed = Math.round(finalSpeed);
  return roundedSpeed > limiter ? limiter : roundedSpeed;
}

export function calculateAccelerationPerTick(acceleration: number): number {
  if (acceleration < 10) acceleration = 10;
  if (acceleration > 700) acceleration = 700;

  const ratio = (acceleration - 10) / (700 - 10);
  const result = 1 + ratio * (70 - 1);

  return Math.round(result);
}
export function neverGoOverTopSpeed(
  currentSpeed: number,
  topSpeed: number
): number {
  if (currentSpeed > topSpeed) {
    return topSpeed;
  }
  return currentSpeed;
}

export const getCarLimiter = (car: RaceCar, terrain: Terrain) => {
  switch (terrain) {
    case "offroad":
      return car.stats.offroad;
    case "turn":
      return car.stats.maneuverability;
    default:
      return 700;
  }
};
// Funzione di utilità per scegliere l’emoji in base alla posizione
export const getPodiumEmoji = (position: number): string => {
  switch (position) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "🏆";
  }
};

// Helper per ricavare il nome del team da una RaceCar
export const getTeamName = (car: RaceCar, teams: RaceTeam[]): string => {
  const team = teams.find((t) => t.cars.some((c) => c.name === car.name));
  return team ? team.name : "—";
};
