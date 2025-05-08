import { Terrain } from "../data/tracks";
import { RaceCar, RaceTeam } from "../dto";

export const returnValueInBoundaries = (value: number): number => {
  if (value < 0) return 0;
  if (value > 700) return 700;
  return value;
};

export function calculateTopSpeed(topSpeed: number, limiter: number): number {
  const ratio = limiter / 700;
  const finalSpeed = topSpeed * ratio;
  const roundedSpeed = Math.round(finalSpeed);
  return roundedSpeed > limiter ? limiter : roundedSpeed;
}

export function calculateAccelerationPerTick(
  acceleration: number,
  isCarsAccelerationUpdated: boolean
): number {
  if (acceleration < 10) acceleration = 10;
  if (acceleration > 700) acceleration = 700;
  const acc = isCarsAccelerationUpdated ? acceleration + 700 : acceleration;

  const ratio = (acc - 10) / (700 - 10);
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

export const getCarLimiter = (
  car: RaceCar,
  terrain: Terrain,
  isCarOffroadUpdated: boolean,
  isCarManuberabilityUpdated: boolean
) => {
  switch (terrain) {
    case "offroad":
      return isCarOffroadUpdated ? car.stats.offroad + 100 : car.stats.offroad;
    case "turn":
      return isCarManuberabilityUpdated
        ? car.stats.maneuverability + 100
        : car.stats.maneuverability;
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

export function deterioramentoStatusAuto(
  velocita: number,
  status: number,
  durability: number
): number {
  // Clampiamo gli input ai range minimi/massimi ammessi
  const s = Math.max(0, Math.min(100, status));
  const d = Math.max(1, durability); // almeno 1 per evitare divisione per zero

  // Fattore base di decadimento proporzionale a velocità/durability
  const decayFactor = velocita / 2 / d;

  // Costante di scala: più piccola = decadimento più dolce
  const SCALE = 0.45;

  // Decadimento “base”
  const decay = decayFactor * SCALE;

  // Applichiamo il decadimento e rimettiamo il risultato nel range [0,100], formattiamo a 3 decimali
  const newStatus = s - decay;
  return Math.round(Math.max(0, Math.min(100, newStatus)) * 1000) / 1000;
}

export function calcolaPuntiGara(n: number): number[] {
  if (n < 1) {
    return [];
  }

  const punti: number[] = new Array(n).fill(0);

  // all’ultimo partecipante (posizione n) assegniamo 0 punti
  punti[n - 1] = 0;

  // risaliamo dalla penultima posizione (n-1) fino alla prima (1)
  for (let idx = n - 2; idx >= 0; idx--) {
    const posizione = idx + 1; // 1-based

    // differenza di punti rispetto al successivo
    const delta = posizione <= 3 ? 2 : 1;

    punti[idx] = punti[idx + 1] + delta;
  }

  return punti;
}

export function boostedTeamsPostRace(teams: RaceTeam[]): RaceTeam[] {
  return teams.map((team) => ({
    ...team,
    cars: team.cars.map((car) => ({
      ...car,
      status:
        car.status < 70 ? car.status + (100 - car.status) / 10 : car.status,
    })),
  }));
}
