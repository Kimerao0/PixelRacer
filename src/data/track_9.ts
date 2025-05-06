import { RaceTrack } from "./tracks";
import SnakeImg from "./images/snake.png";

export const track_9: RaceTrack = {
  name: "Serpent Temple",
  image: SnakeImg,
  trackId: "9",
  description:
    "Nel cuore di un'antica regione indiana, Serpent Temple si snoda tra rovine dimenticate e statue sacre di divinità serpentine. Le curve numerose e avvolgenti imitano i movimenti sinuosi dei cobra, costringendo i piloti a una danza di precisione tra accelerazioni e frenate. Tre lunghi rettilinei da 10 tiles offrono invece l'opportunità di liberare la potenza e sfidare il vento, ma solo per chi ha superato le insidie precedenti. Brevi sezioni offroad rendono il percorso ancora più imprevedibile, tra polvere e sabbia che sembrano voler reclamare la pista.",
  tiles: [
    // Curvature iniziali e prime insidie
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },

    // Primo rettilineo (10 tiles)
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

    // Sezione curve e offroad
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Secondo rettilineo (10 tiles)
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

    // Curvoni medi + offroad
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },

    // Terzo rettilineo (10 tiles)
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

    // Ultime curve prima del traguardo
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
  ],
};
