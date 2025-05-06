import { RaceTrack } from "./tracks";
import VortexImg from "./images/vortex.png";

export const track_2: RaceTrack = {
  name: "Desert Vortex",
  image: VortexImg,
  trackId: "2",
  description:
    "Nel cuore del deserto ardente, Desert Vortex si snoda tra polverose distese e sabbia infuocata. Dopo un lungo rettilineo iniziale che consente di spingere al massimo, i piloti devono affrontare sezioni offroad instabili e curve impegnative che spezzano il ritmo. La pista alterna velocità e tecnica, sfidando i nervi tra dune e vento tagliente. Solo chi saprà adattarsi alla natura imprevedibile del deserto potrà dominare questa corsa estrema.",
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
