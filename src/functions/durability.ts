export interface DurabilityParams {
  /** Distanza da terra */
  ddt: number;
  /** Volume delle gomme minore è migliore */
  vty: number;
  /** peso, maggiore è migliore, fino ad un certo punto */
  weight: number;
}

export function calculateDurability(params: DurabilityParams): number {
  // 1) Coefficienti originali
  const k1 = -30.7900635039223;
  const k2 = -1.20123109905637;
  const k3 = 1.03935294213185;
  const k4 = -841.695830829449;

  // 2) Calcolo raw
  const raw = k1 * params.ddt + k2 * params.vty + k3 * params.weight + k4;

  // 3) Parametri di clamping e blending
  const MIN = 10;
  const MAX = 700;
  const MID = (MIN + MAX) / 2; // 355
  const alpha = 0.8; // peso del raw nel blending

  // 4) Blending con il centro
  let smoothed = raw * alpha + MID * (1 - alpha);

  // 5) Clamping iniziale
  smoothed = Math.max(MIN, Math.min(MAX, smoothed));

  // 6) “Uplift” dei valori troppo bassi
  const lowThreshold = 100; // soglia sotto cui alzare
  const upliftFactor = 0.4; // frazione di distanza da MIN
  if (smoothed < lowThreshold) {
    smoothed = lowThreshold + (smoothed - MIN) * upliftFactor;
  }

  // 7) Risultato finale arrotondato
  return Math.round(smoothed);
}
