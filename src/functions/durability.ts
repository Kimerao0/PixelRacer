export interface DurabilityParams {
  /** Distanza da terra */
  ddt: number;
  /** Volume delle gomme minore è migliore */
  vty: number;
  /** peso, maggiore è migliore, fino ad un certo punto */
  weight: number;
}

export function calculateDurability(params: DurabilityParams): number {
  // coefficienti ottenuti risolvendo il sistema lineare
  const k1 = -30.7900635039223; // coefficiente su ddt
  const k2 = -1.20123109905637; // coefficiente su vty
  const k3 = 1.03935294213185; // coefficiente su weight
  const k4 = -841.695830829449; // termine costante

  const durability = Math.round(
    k1 * params.ddt + k2 * params.vty + k3 * params.weight + k4
  );

  if (durability > 700) return 700;
  if (durability < 0) return 10;
  return durability;
}
