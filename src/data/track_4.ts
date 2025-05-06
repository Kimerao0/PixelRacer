import { RaceTrack } from "./tracks";
import UluruImg from "./images/uluru.png";

export const track_4: RaceTrack = {
  name: "Uluru Trail",
  image: UluruImg,
  trackId: "4",
  description:
    "Ai piedi del maestoso Uluru si estende Uluru Trail, un tracciato aspro e polveroso che attraversa il cuore selvaggio dell'Australia. Questa pista offroad è dominata da terreni sabbiosi e irregolari, intervallati da curve ampie e lente. La natura ha scolpito il percorso tra cespugli e rocce rosse, offrendo sfide imprevedibili ad ogni svolta. Qui, velocità e controllo sono fondamentali per sopravvivere alle insidie di un ambiente tanto magnifico quanto spietato.",
  tiles: [
    // Rettilineo iniziale offroad (molto lungo)
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
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

    // Curva larga
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Sezione mista breve
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Curva ampia 2
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Lungo rettilineo offroad finale
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Curva finale per tornare al punto di partenza
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Lungo rettilineo offroad finale
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    // Curva finale per tornare al punto di partenza
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
  ],
};
