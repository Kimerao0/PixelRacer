export interface OffRoadParams {
  /** Distanza da terra, maggiore è migliore */
  ddt: number;
  /** Volume delle gomme maggiore è migliore */
  vty: number;
  /** Bilanciata è meglio (1 è perfettamente bilanciato) */
  balance: number;
}

export function calculateOffRoad(params: OffRoadParams): number {
  const coefDdt = 104.825041968636;
  const coefVty = -1.02927568275806;
  const coefBalance = 71.0354993244073;
  const intercept = -91.8912909961921;

  const offroad =
    coefDdt * params.ddt +
    coefVty * params.vty +
    coefBalance * params.balance +
    intercept;

  if (offroad > 700) return 700;
  if (offroad < 0) return 10;
  return offroad;
}
