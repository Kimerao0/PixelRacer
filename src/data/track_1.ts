import { RaceTrack } from "./tracks";
import OvalImg from "./images/oval.png";

export const track_1: RaceTrack = {
  name: "Oval Thunder",
  image: OvalImg,
  description:
    "Un circuito classico e leggendario, costruito per la velocità pura. Oval Thunder propone un anello perfetto composto da quattro curve strette e quattro lunghi rettilinei dove il coraggio e la precisione fanno la differenza. Senza offroad e senza scuse, questa pista premia i sorpassi audaci e la gestione millimetrica della scia. Solo i più veloci sapranno imporsi su questo tempio delle gare ad alta velocità.",
  trackId: "1",
  tiles: [
    // Rettifilo 1 (prima metà)
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },

    // Curva 1 (breve)
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Rettifilo 2 (lungo)
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

    // Curva 2 (breve)
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Rettifilo 3 (lungo)
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

    // Curva 3 (breve)
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Rettifilo 4 (lungo)
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

    // Curva 4 (breve)
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Rettifilo 1 (seconda metà)

    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
  ],
};
