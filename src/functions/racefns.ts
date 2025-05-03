export function calculateSpeed(topSpeed: number, limiter: number): number {
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
