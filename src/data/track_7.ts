import { RaceTrack } from "./tracks";
import CartelImg from "./images/cartel.png";

export const track_7: RaceTrack = {
  name: "Cartel Run",
  image: CartelImg,
  trackId: "7",
  description:
    "Nascosto tra le strade dissestate di un remoto avamposto sudamericano, Cartel Run è teatro di corse clandestine dove il rischio è parte del gioco. Tra sezioni offroad polverose e curve insidiose tracciate su terreni abbandonati, i piloti si sfidano tra container arrugginiti, capannoni fatiscenti e spettatori poco raccomandabili. La tensione cresce curva dopo curva fino a culminare in un rettilineo finale di 15 km, dove si decide tutto in uno sprint al limite, tra colpi bassi e motori urlanti. Qui non si corre per la gloria, si corre per sopravvivere.",
  tiles: [
    // Inizio tecnico con offroad e curve secche
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },

    // Curvone lento + terreno misto
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Sezione mista di svolte e salti offroad
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Sezione mista di svolte e salti offroad
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Curva più ampia e scivolosa
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Rettilineo finale (15 tiles) → finale ad altissima velocità
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
