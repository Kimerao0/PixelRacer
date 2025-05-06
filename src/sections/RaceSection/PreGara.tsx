import React from "react";
import { tracks } from "../../data/tracks";
import { RaceState } from "./RacePage";
import { Button } from "@mui/material";
import { Column } from "../../style";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useGoHome } from "../../hooks/useGoHome";
import { RaceTeam } from "../../dto";

export interface GaraElProps {
  teams: RaceTeam[];
  currentTrack: number;
  setRaceState: React.Dispatch<React.SetStateAction<RaceState>>;
}

const PreGara: React.FC<GaraElProps> = ({
  teams,
  currentTrack,
  setRaceState,
}) => {
  const goHome = useGoHome();
  return (
    <Column sx={{ padding: 4 }}>
      <Button
        variant="outlined"
        size="large"
        sx={{ maxWidth: `200px`, marginBottom: `24px` }}
        onClick={() => goHome()}
      >
        <ArrowBackIosIcon sx={{ fontSize: 20 }} /> Torna alla home
      </Button>
      <h3>Inizia gara {currentTrack}</h3>
      {tracks[currentTrack - 1] && (
        <>
          <p>
            <strong>Pista: </strong>
            {tracks[currentTrack - 1].name}
          </p>
          <img
            src={tracks[currentTrack - 1].image}
            alt="Immagine Pista"
            style={{ width: 300 }}
          />
          <p>
            <strong>Descrizione: </strong>
            {tracks[currentTrack - 1].description}
          </p>
        </>
      )}
      <div>
        <p>
          <strong>Classifica corrente: </strong>
        </p>
        <ul style={{ listStyle: "decimal" }}>
          {[...teams]
            .sort((a, b) => b.punti - a.punti)
            .map((team) => (
              <li key={team.name}>
                {team.name}, {team.punti}
              </li>
            ))}
        </ul>
      </div>
      <Button
        variant="contained"
        size="large"
        sx={{ maxWidth: `200px`, marginTop: `48px` }}
        onClick={() => {
          setRaceState("preparazione");
        }}
      >
        Inizia gara
      </Button>
    </Column>
  );
};

export default PreGara;
