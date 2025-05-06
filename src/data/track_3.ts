import { RaceTrack } from "./tracks";
import SakuraImg from "./images/sakura.png";

export const track_3: RaceTrack = {
  name: "Sakura Rush",
  image: SakuraImg,
  trackId: "3",
  description:
    "Avvolta da una cornice di ciliegi in fiore e pagode antiche, Sakura Rush è un circuito rapido e tortuoso nel cuore del Giappone. Qui la velocità si mescola con la tecnica in un susseguirsi di curve fluide e rettilinei brevi che richiedono precisione assoluta. Ogni metro è incorniciato da petali danzanti e colline armoniose, ma non lasciarti ingannare dalla bellezza: solo chi possiede riflessi fulminei e controllo millimetrico potrà trionfare in questo tracciato poetico e implacabile.",
  tiles: [
    // Rettilineo di partenza (breve)
    { terrain: "straight" },
    { terrain: "straight" },

    // Serie di curve tecniche
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
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "straight" },
    { terrain: "straight" },
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
    { terrain: "straight" },
    { terrain: "straight" },

    // Tornante stretto
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Sezione fluida di curve veloci
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Rettilineo finale
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
  ],
};
