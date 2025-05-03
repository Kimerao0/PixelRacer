import React, { useState } from "react";
import { GaraElProps } from "./PreGara";
import { RaceCar } from "../../dto";
import { Column, Row } from "../../style";
import CarCard from "../TeamsSection/components/carCard";
import { Button, styled } from "@mui/material";

const Preparazione: React.FC<
  GaraElProps & {
    setRacingCars: React.Dispatch<React.SetStateAction<RaceCar[]>>;
  }
> = ({ teams, setRaceState, setRacingCars }) => {
  const [teamsSelection, setTeamsSelection] = useState<
    { teamName: string; carName: string }[]
  >([]);

  const handleCarSelection = (teamName: string, carName: string) => {
    const teamHasAlreadySelected = teamsSelection.find(
      (team) => team.teamName === teamName
    );

    if (teamHasAlreadySelected) {
      const _teamsSelection = teamsSelection.filter(
        (team) => team.teamName !== teamName
      );
      _teamsSelection.push({ teamName, carName });
      setTeamsSelection(_teamsSelection);
    }
    if (!teamHasAlreadySelected) {
      setTeamsSelection((prev) => [...prev, { teamName, carName }]);
    }
  };

  const handleRaceStart = () => {
    const selectedCars = teamsSelection.map(
      (team) =>
        teams
          .find((t) => t.name === team.teamName)
          ?.cars.find((c) => c.name === team.carName) as RaceCar
    );

    setRacingCars(selectedCars);
    setRaceState("in corso");
  };

  return (
    <Column sx={{ padding: 4 }}>
      <h2>Selezionare le auto per questa gara:</h2>
      {teams
        .sort((a, b) => a.punti - b.punti)
        .map((team) => (
          <Column key={team.name}>
            <h3 style={{ marginBottom: 5 }}>{team.name}:</h3>
            <Row>
              {team.cars.map((car, i) => (
                <CustomButton
                  key={car.name}
                  onClick={() => handleCarSelection(team.name, car.name)}
                  style={{
                    border: `
                       5px solid ${
                         teamsSelection.find(
                           (_car) => _car.carName === car.name
                         )
                           ? "#F0544F"
                           : "transparent"
                       }`,
                  }}
                >
                  <CarCard key={car.name} car={car} index={i} />
                </CustomButton>
              ))}
            </Row>
          </Column>
        ))}
      <Button
        variant="contained"
        size="large"
        onClick={handleRaceStart}
        disabled={teamsSelection.length < teams.length}
        sx={{ mt: 4 }}
      >
        Start Race
      </Button>
    </Column>
  );
};

export default Preparazione;

const CustomButton = styled("button")({
  all: "unset",
  cursor: "pointer",
  margin: 12,
  borderRadius: 12,
  "&>div": {
    marginRight: 0,
  },
});
