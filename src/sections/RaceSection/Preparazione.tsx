import React, { useState } from "react";
import { GaraElProps } from "./PreGara";
import { RaceCar, UpgradeName, Upgrade } from "../../dto";
import { Column, Row } from "../../style";
import CarCard from "../TeamsSection/components/carCard";
import { Button, styled } from "@mui/material";
import { getUpgradeImage } from "../TeamsSection/components/editTeamPage";

const Preparazione: React.FC<
  GaraElProps & {
    setRacingCars: React.Dispatch<React.SetStateAction<RaceCar[]>>;
  }
> = ({ teams, setRaceState, setRacingCars }) => {
  const [teamsSelection, setTeamsSelection] = useState<
    { teamName: string; carName: string; upgrade: UpgradeName | null }[]
  >([]);

  const handleCarSelection = (teamName: string, carName: string) => {
    setTeamsSelection((prev) => {
      const existing = prev.find((sel) => sel.teamName === teamName);
      if (existing) {
        return prev.map((sel) =>
          sel.teamName === teamName ? { ...sel, carName } : sel
        );
      } else {
        return [...prev, { teamName, carName, upgrade: null }];
      }
    });
  };

  const handleUpgradeSelection = (
    teamName: string,
    upgradeName: UpgradeName | null
  ) => {
    setTeamsSelection((prev) =>
      prev.map((sel) =>
        sel.teamName === teamName ? { ...sel, upgrade: upgradeName } : sel
      )
    );
  };

  const handleRaceStart = () => {
    const selectedCars = teamsSelection.map((teamSel) => {
      const team = teams.find((t) => t.name === teamSel.teamName)!;
      const car = team.cars.find((c) => c.name === teamSel.carName)!;

      // Inseriamo l'upgrade se selezionato
      const selectedUpgrade =
        teamSel.upgrade != null
          ? team.upgrades.find((u) => u.name === teamSel.upgrade)!
          : null;

      const upgradedCar: RaceCar = {
        ...car,
        activeUpgrades: selectedUpgrade ? [selectedUpgrade] : [],
      };

      return upgradedCar;
    });

    setRacingCars(selectedCars);
    setRaceState("in corso");
  };

  return (
    <Column sx={{ padding: 4 }}>
      <h2>Selezionare le auto per questa gara:</h2>
      {[...teams]
        .sort((a, b) => b.punti - a.punti)
        .map((team) => {
          const selectedTeam = teamsSelection.find(
            (sel) => sel.teamName === team.name
          );

          return (
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
                          selectedTeam?.carName === car.name
                            ? "#F0544F"
                            : "transparent"
                        }`,
                    }}
                  >
                    <CarCard key={car.name} car={car} index={i} />
                  </CustomButton>
                ))}

                {team.upgrades.map((upgrade) => (
                  <CustomButton
                    key={upgrade.name}
                    onClick={() =>
                      handleUpgradeSelection(
                        team.name,
                        selectedTeam?.upgrade === upgrade.name
                          ? null
                          : upgrade.name
                      )
                    }
                    style={{
                      border: `
                        5px solid ${
                          selectedTeam?.upgrade === upgrade.name
                            ? "#F0544F"
                            : "transparent"
                        }`,
                      height: 70,
                    }}
                  >
                    <img
                      src={getUpgradeImage(upgrade.name)}
                      alt={upgrade.name}
                      style={{
                        width: 70,
                        height: "fit-content",
                        borderRadius: 5,
                      }}
                    />
                  </CustomButton>
                ))}
              </Row>
            </Column>
          );
        })}
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
