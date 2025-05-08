import { RaceTrack } from "./tracks";
import SaltImg from "./images/salt.png";

export const track_11: RaceTrack = {
  name: "Salt Flat Blaze",
  image: SaltImg,
  description:
    "Nel bianco accecante del deserto di sale, Salt Flat Blaze trasforma la vastità in una sfida estrema. La pista inizia con un rettilineo infinito dove la velocità è tutto, ma la calma è solo apparente. Una curva netta spezza il ritmo, anticipata e seguita da sezioni offroad insidiose dove il grip diventa un miraggio. Superata la curva, l'asfalto lascia di nuovo spazio alla potenza pura con un rettilineo finale che sembra non finire mai. In questo ambiente privo di punti di riferimento, è il coraggio a fare la differenza tra vincere e perdersi.",
  trackId: "11",
  tiles: [
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

    // Offroad prima della curva
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Curva stretta
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Offroad dopo la curva
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },

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
  ],
};
