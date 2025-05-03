import React from "react";
import { RaceCar, RaceTeam } from "../../dto";
import { Column } from "../../style";
import PreGara from "./PreGara";
import Preparazione from "./Preparazione";
import RaceHandler from "./RaceHandler";

type Props = {
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
};

export type RaceState = "pre-gara" | "preparazione" | "in corso" | "fine gara";

const RacePage: React.FC<Props> = ({ teams }) => {
  const [raceState, setRaceState] = React.useState<RaceState>("pre-gara");
  const [currentTrack, setCurrentTrack] = React.useState<number>(1);
  const [racingCars, setRacingCars] = React.useState<RaceCar[]>([]);

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
            cars={racingCars}
            currentTrack={currentTrack}
          />
        );
    }
  };
  return <Column>{renderByState()}</Column>;
};

export default RacePage;
