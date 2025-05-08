import { RaceTrack } from "./tracks";
import MudFightImg from "./images/mudfight.png";

export const track_10: RaceTrack = {
  name: "Mud Fight",
  image: MudFightImg,
  description:
    "Benvenuti in Mud Fight, una pista breve ma brutale dove la foga della battaglia incontra la lotta contro il fango. Completamente offroad, il tracciato si snoda tra pozzanghere profonde e curve strette che non lasciano respiro. Qui il grip è un lusso e il controllo dell’acceleratore fa la differenza tra dominare la corsa o finire impantanati. Piccole curve a ritmo serrato scandiscono il percorso fino al traguardo, rendendo ogni sorpasso una sfida diretta e feroce. Solo il più aggressivo avrà la meglio in questo combattimento tra fango e motori.",
  trackId: "10",
  tiles: [
    // Partenza offroad
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Piccole curve serrate
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },

    // Piccola sequenza tecnica
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },

    // Sezione centrale movimentata
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "turn" },

    // Ultime curve e arrivo
    { terrain: "offroad" },
    { terrain: "offroad" },
    { terrain: "turn" },
    { terrain: "offroad" },
    { terrain: "offroad" },
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
  ],
};
