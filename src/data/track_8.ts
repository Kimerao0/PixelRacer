import { RaceTrack } from "./tracks";
import DakarImg from "./images/dakar.png";

export const track_8: RaceTrack = {
  name: "Dakar Descent",
  trackId: "8",
  image: DakarImg,
  description:
    "In un viaggio estremo tra le sabbie e le rocce di terre desolate, Dakar Descent porta i piloti in una sfida brutale e senza compromessi. Il tracciato inizia con brevi rettilinei che consentono di prendere slancio, ma ben presto si trasforma in un incubo fatto di curve strette e sezioni offroad interminabili. Lungo la tratta finale, i sentieri scavati dal vento rendono ogni curva una battaglia per il controllo. Questa non è solo una corsa: è sopravvivere al tracciato e domarlo fino all'ultimo metro.",
  tiles: [
    // Rettilineo iniziale (breve e veloce)
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },

    // Prima sezione offroad mista con curve
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },

    // Seconda sezione di curve e offroad
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },

    // Curva ampia + inizio della lunga sezione finale
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

    // Ultime curve nella sabbia
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    // Rettilineo iniziale (breve e veloce)
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "straight" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
  ],
};
