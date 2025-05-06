import { RaceTrack } from "./tracks";
import MonzaImg from "./images/monza.png";

export const track_6: RaceTrack = {
  name: "Monza Madness",
  image: MonzaImg,
  trackId: "6",
  description:
    "Nel cuore della leggendaria Monza sorge Monza Madness, un tracciato progettato per i veri amanti della velocità pura. Composto quasi interamente da lunghi rettilinei, inclusa una sezione principale di ben 25 km consecutivi dove le auto raggiungono velocità estreme, la pista alterna sezioni a gas spalancato con rapide curve tecniche che mettono alla prova riflessi e precisione. Nessun offroad a rallentare l'azione: qui è solo questione di chi osa di più e frena più tardi. Un circuito per chi sogna di spingersi oltre il limite.",
  tiles: [
    // Rettilineo di partenza (lungo)
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },

    // Curva rapida 1
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Rettilineo lungo (25 tiles — rettilineo principale)
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },

    // Curva rapida 2
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Rettilineo medio
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },

    // Curva rapida 3
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
  ],
};
