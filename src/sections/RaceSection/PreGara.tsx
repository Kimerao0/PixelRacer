import React from "react";
import { RaceTeam } from "../../dto";
import { tracks } from "../../data/tracks";
import { RaceState } from "./RacePage";
import { Button } from "@mui/material";
import { Column } from "../../style";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useGoHome } from "../../hooks/useGoHome";

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
      <h3>Inizia gara {currentTrack}</h3>
      <p>
        <strong>Pista: </strong>
        {tracks[currentTrack - 1].name}
      </p>
      <div>
        <p>
          <strong>Classifica corrente: </strong>
        </p>
        <ul style={{ listStyle: "decimal" }}>
          {teams
            .sort((a, b) => a.punti - b.punti)
            .map((team) => (
              <li key={team.name}>
                {team.name} {team.punti}
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
      <Button
        variant="outlined"
        size="large"
        sx={{ maxWidth: `200px`, marginTop: `48px` }}
        onClick={() => goHome()}
      >
        <ArrowBackIosIcon sx={{ fontSize: 20 }} /> Torna alla home
      </Button>
    </Column>
  );
};

export default PreGara;
