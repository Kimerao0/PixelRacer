import React from "react";
import { RaceCar, RaceTeam } from "../../dto";
import { Column } from "../../style";
import PreGara from "./PreGara";
import Preparazione from "./Preparazione";
import RaceHandler from "./RaceHandler";
import TeamRanking from "./ClassificaPostGara";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

type Props = {
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
};

export type RaceState = "pre-gara" | "preparazione" | "in corso" | "fine gara";

const RacePage: React.FC<Props> = ({ teams, setTeams }) => {
  const [raceState, setRaceState] = React.useState<RaceState>("pre-gara");
  const [currentTrack, setCurrentTrack] = React.useState<number>(1);
  const [racingCars, setRacingCars] = React.useState<RaceCar[]>([]);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  function resetTeams(teams: RaceTeam[]) {
    const baseTeams = teams.map((team) => ({
      ...team,
      punti: 0,
      cars: team.cars.map((car) => ({
        ...car,
        status: 100,
      })),
    }));
    setTeams(baseTeams);
    localStorage.setItem("teams", JSON.stringify(baseTeams));
  }

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmReset = () => {
    resetTeams(teams);
    handleCloseConfirm();
  };

  const renderByState = () => {
    switch (raceState) {
      case "pre-gara":
        return (
          <PreGara
            teams={teams}
            currentTrack={currentTrack}
            setRaceState={setRaceState}
          />
        );
      case "preparazione":
        return (
          <Preparazione
            teams={teams}
            currentTrack={currentTrack}
            setRaceState={setRaceState}
            setRacingCars={setRacingCars}
          />
        );
      case "in corso":
        return (
          <RaceHandler
            teams={teams}
            setTeams={setTeams}
            cars={racingCars}
            currentTrack={currentTrack}
            setRaceState={setRaceState}
          />
        );
      case "fine gara":
        return (
          <TeamRanking
            teams={teams}
            setCurrentTrack={setCurrentTrack}
            setRaceState={setRaceState}
          />
        );
    }
  };

  return (
    <Column sx={{ padding: 4, maxWidth: 1600 }}>
      {renderByState()}

      {/* Pulsante per aprire la modale di conferma */}
      {raceState === "pre-gara" && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenConfirm}
          sx={{
            marginTop: 5,
            width: 184,
            marginLeft: "auto",
            padding: "6px 14px",
          }}
        >
          Reset del campionato
        </Button>
      )}

      {/* Dialog di conferma */}
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="reset-dialog-title"
        aria-describedby="reset-dialog-description"
      >
        <DialogTitle id="reset-dialog-title">
          Conferma reset campionato
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="reset-dialog-description">
            Sei sicuro di voler resettare tutti i punti e lo stato delle
            macchine? Questa operazione non potrà essere annullata.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Annulla</Button>
          <Button
            onClick={handleConfirmReset}
            variant="contained"
            color="primary"
            autoFocus
          >
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </Column>
  );
};

export default RacePage;
