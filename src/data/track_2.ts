import { RaceTrack } from "./tracks";
import VortexImg from "./images/vortex.png";

export const track_2: RaceTrack = {
  name: "Desert Vortex",
  image: VortexImg,
  trackId: "2",
  description:
    "Attraversa le sabbie roventi di Desert Vortex: un lungo rettilineo iniziale seguito da sezioni offroad insidiose e curve larghe e sabbiose che mettono alla prova aderenza e controllo.",
  tiles: [
    // Rettilineo iniziale (molto lungo)
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

    // Sezione Offroad 1 (breve)
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Curva lunga 1
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Sezione Offroad 2 (media)
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Curva lunga 2
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Sezione Offroad 3 (media)
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Breve curva
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Breve rettilineo finale per chiudere
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
  ],
};
