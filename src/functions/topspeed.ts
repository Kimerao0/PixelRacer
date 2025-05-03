function calcolaOutput(input: number): number {
  // Definiamo i punti di riferimento ordinati per valore di x
  const points = [
    { x: 2.598, y: 150 },
    { x: 3.5, y: 250 },
    { x: 6.86, y: 350 },
    { x: 34.66, y: 600 },
  ];

  // Se l'input è minore del minimo, estrapoliamo usando il primo tratto
  if (input <= points[0].x) {
    const { x: x0, y: y0 } = points[0];
    const { x: x1, y: y1 } = points[1];
    const m = (y1 - y0) / (x1 - x0);
    return y0 + m * (input - x0);
  }

  // Se l'input è maggiore del massimo, estrapoliamo usando l'ultimo tratto
  if (input >= points[points.length - 1].x) {
    const n = points.length;
    const { x: x0, y: y0 } = points[n - 2];
    const { x: x1, y: y1 } = points[n - 1];
    const m = (y1 - y0) / (x1 - x0);
    return y0 + m * (input - x0);
  }

  // Altrimenti, cerchiamo in quale intervallo si trova l'input e facciamo l'interpolazione
  for (let i = 0; i < points.length - 1; i++) {
    if (input >= points[i].x && input <= points[i + 1].x) {
      const { x: x0, y: y0 } = points[i];
      const { x: x1, y: y1 } = points[i + 1];
      const m = (y1 - y0) / (x1 - x0);
      return y0 + m * (input - x0);
    }
  }

  // Caso di fallback (non dovrebbe mai accadere)
  return NaN;
}

export function calcolaVelocitaMassima(
  // rapporto lunghezza auto / passo
  rlp: number,
  // peso del veicolo
  ps: number,
  // distanza carrozzeria da terra
  dds: number,
  // coefficiente aerodinamico
  cda: number
): number {
  // Velocità di riferimento
  const velocitaRiferimento = 200; // Velocità media di riferimento (200 km/h)

  // Calcolare i fattori per ogni parametro (aggiungendo una costante di correzione)
  const fattoreRlp = Math.pow((3 - rlp) / 2.5, 2); // Più basso è rlp, maggiore l'effetto
  const fattorePs = Math.pow((5000 - ps) / 4800, 1.5); // Più basso è ps, maggiore l'effetto
  const fattoreDds = Math.pow((20 - dds) / 19, 2); // Più basso è dds, maggiore l'effetto
  const fattoreCda = Math.pow((0.4 - cda) / 0.1, 3); // Più basso è cda, maggiore l'effetto

  // Calcolare la velocità massima
  const velocitaMax =
    velocitaRiferimento * fattoreRlp * fattorePs * fattoreDds * fattoreCda;

  const output = calcolaOutput(velocitaMax);
  if (output > 700) return 700;
  if (output < 0) return 10;

  return output;
}
