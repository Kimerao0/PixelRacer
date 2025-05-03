export interface AccelerationParams {
  /** Peso dell'auto (più basso → migliore) */
  weight: number;
  /** Volume delle gomme posteriori in pixel rispetto al quello dell'auto */
  rearTyreVolumeRatio: number;
  /** Coefficiente aerodinamico (Cd) (più basso → migliore) */
  aerodynamicCoefficient: number;
}

export function calculateAcceleration(params: AccelerationParams): number {
  const { weight, rearTyreVolumeRatio, aerodynamicCoefficient } = params;

  const weightCoef = -0.214776831508421;
  const tyreCoef = 12.8421794949087;
  const aeroCoef = -12001.8690685609;
  const intercept = 4598.71474234933;

  const acceleration =
    weightCoef * weight +
    tyreCoef * rearTyreVolumeRatio +
    aeroCoef * aerodynamicCoefficient +
    intercept;

  if (acceleration > 700) return 700;
  if (acceleration < 0) return 10;

  return acceleration;
}
