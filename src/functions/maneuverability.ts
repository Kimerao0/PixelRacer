function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function calcolaManovrabilita(
  passo: number,
  altezza: number,
  peso: number,
  balance: number
): number {
  // Verifica che i parametri siano nei range previsti
  if (passo < 5 || passo > 40) {
    throw new Error("Il valore del passo deve essere compreso tra 5 e 40.");
  }
  if (altezza < 5 || altezza > 30) {
    throw new Error("Il valore dell'altezza deve essere compreso tra 5 e 30.");
  }
  if (peso < 500 || peso > 2500) {
    throw new Error("Il valore del peso deve essere compreso tra 500 e 2500.");
  }
  if (balance < 0.5 || balance > 2) {
    throw new Error("Il valore del balance deve essere compreso tra 0.5 e 2.");
  }

  // Normalizziamo i valori:
  // - Per il passo: un valore minore (più vicino a 5) è più favorevole alla manovrabilità,
  //   quindi usiamo (40 - passo) per ottenere un punteggio decrescente all'aumentare del passo.
  // - Per l'altezza: un valore minore (più vicino a 5) è preferibile, quindi (30 - altezza).
  // Normalizziamo ciascuno nel range [0, 1].
  const normalizedPasso = (40 - passo) / (40 - 5); // 1 se passo=5, 0 se passo=40
  const normalizedAltezza = (30 - altezza) / (30 - 5); // 1 se altezza=5, 0 se altezza=30
  const normalizePeso = (2500 - peso) / (2500 - 500); // 1 se altezza=5, 0 se altezza=30
  // 1 se balance=1, 0 se balance=2 oppire balance=0.5
  const normalizedBalance = (2 - balance) / (2 - 0.5);

  // Calcola l'indice come media dei due valori normalizzati.
  let indice =
    ((normalizedPasso * 3 +
      normalizedAltezza +
      normalizePeso +
      normalizedBalance) /
      6) *
    1000;

  if (indice < 350) indice = 350;
  if (indice > 600) indice = 600;

  return mapRange(indice, 300, 650, 100, 700);
}
