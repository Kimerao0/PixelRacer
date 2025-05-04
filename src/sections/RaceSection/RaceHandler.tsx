import React, { useEffect, useState } from "react";
import { RaceCar, RaceTeam } from "../../dto";
import { tracks } from "../../data/tracks";
import { Column, Row } from "../../style";
import { Button, styled } from "@mui/material";
import {
  boostedTeamsPostRace,
  calcolaPuntiGara,
  calculateAccelerationPerTick,
  calculateTopSpeed,
  deterioramentoStatusAuto,
  getCarLimiter,
  getPodiumEmoji,
  getTeamName,
  neverGoOverTopSpeed,
} from "../../functions/racefns";
import DrawTrack from "../TrackSection/drawTrack";
import { RaceState } from "./RacePage";

export interface CarRaceState {
  car: RaceCar;
  meters: number;
  currentSpeed: number;
  finalPosition: number | null;
  bonusLuck: number;
}

interface RaceResult {
  car: RaceCar;
  position: number;
}

const RaceHandler: React.FC<{
  cars: RaceCar[];
  currentTrack: number;
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
  setRaceState: React.Dispatch<React.SetStateAction<RaceState>>;
}> = ({ cars, currentTrack, teams, setTeams, setRaceState }) => {
  const initialCarState: CarRaceState[] = cars.map((car) => ({
    car: car,
    meters: 1,
    currentSpeed: 1,
    finalPosition: null,
    bonusLuck: 0,
  }));
  const [speed, setSpeed] = useState(250);
  const [carsRaceState, setCarsRaceState] =
    useState<CarRaceState[]>(initialCarState);
  const [raceIsOver, setRaceIsOver] = useState(false);

  const track = tracks[currentTrack - 1];

  useEffect(() => {
    // calculate a bonus luck for each car (1-25)
    const newCarsRaceState = carsRaceState.map((carState) => ({
      ...carState,
      bonusLuck: Math.floor(Math.random() * 25) + 1,
    }));
    setCarsRaceState(newCarsRaceState);
  }, []);

  const handleTick = () => {
    setCarsRaceState((prev) => {
      const finishLine = track.tiles.length * 1000;
      // quante macchine hanno già una posizione
      const alreadyFinishedCount = prev.filter(
        (c) => c.finalPosition !== null
      ).length;
      // raccoglie i nuovi risultati di questo tick
      const resultsToAdd: RaceResult[] = [];

      const updated = prev.map((carState) => {
        // se ha già finalPosition, non facciamo nulla
        if (carState.finalPosition !== null) return carState;

        // applica il deterioramento dello status
        const newStatus = deterioramentoStatusAuto(
          carState.currentSpeed,
          carState.car.status,
          carState.car.stats.durability
        );

        // se lo status scende a zero o sotto, la macchina si ferma
        if (newStatus <= 0) {
          return {
            ...carState,
            car: { ...carState.car, status: 0 },
            currentSpeed: 0,
          };
        }

        // calcolo tile, limiter e topSpeed come prima
        const tileIdx = Math.floor(carState.meters / 1000);
        const currentTile = track.tiles[tileIdx] ?? track.tiles[0];
        const limiter = getCarLimiter(carState.car, currentTile.terrain);
        const topSpeed = calculateTopSpeed(
          carState.car.stats.topSpeed,
          limiter
        );

        const newSpeed = neverGoOverTopSpeed(
          carState.currentSpeed +
            carState.bonusLuck +
            calculateAccelerationPerTick(carState.car.stats.acceleration),
          topSpeed
        );
        const newMeters = carState.meters + newSpeed;

        // se supera il traguardo
        if (newMeters >= finishLine) {
          const position = alreadyFinishedCount + resultsToAdd.length + 1;
          // aggiungiamo il risultato alla lista temporanea
          resultsToAdd.push({ car: carState.car, position });
          // blocchiamo la macchina al traguardo
          return {
            ...carState,
            car: { ...carState.car, status: newStatus },
            meters: finishLine,
            currentSpeed: 0,
            finalPosition: position,
          };
        }

        // altrimenti proseguiamo normalmente
        return {
          ...carState,
          car: { ...carState.car, status: newStatus },
          meters: newMeters,
          currentSpeed: newSpeed,
        };
      });

      return updated;
    });
  };

  useEffect(() => {
    if (raceIsOver) {
      return;
    }
    const interval = setInterval(handleTick, speed);
    // Cleanup quando il componente viene smontato
    return () => clearInterval(interval);
  }, [speed, raceIsOver]);

  useEffect(() => {
    // fine gara quando tutte le macchine hanno fermato (per status=0 o arrivo)
    if (
      carsRaceState.every(
        (c) => c.finalPosition !== null || c.currentSpeed === 0
      )
    ) {
      console.log("Gara finita!");
      setRaceIsOver(true);
    }
  }, [carsRaceState]);

  // Calcolo del podio: se ci sono finalPosition li uso, altrimenti ordino per metri percorsi
  const podium = carsRaceState
    .slice()
    .sort((a, b) => {
      if (a.finalPosition !== null && b.finalPosition !== null)
        return a.finalPosition - b.finalPosition;
      if (a.finalPosition !== null) return -1;
      if (b.finalPosition !== null) return 1;
      return b.meters - a.meters;
    })
    .map((c, idx) => ({
      carState: c,
      position: c.finalPosition ?? idx + 1,
    }));

  const handleRaceIsOver = () => {
    // aggiorna lo stato delle macchine nel team
    const updatedTeams = carsRaceState.map((carState): RaceTeam => {
      const teamName = getTeamName(carState.car, teams);
      const team = teams.find((t) => t.name === teamName) as RaceTeam;
      const puntiQuestaGara = calcolaPuntiGara(carsRaceState.length)[
        (carState.finalPosition || 1) - 1
      ];
      return {
        ...team,
        punti: team.punti + puntiQuestaGara,
        cars: team.cars.map((car) => {
          if (car.name === carState.car.name) {
            return {
              ...car,
              status: carState.car.status,
            };
          }
          return car;
        }),
      };
    });
    console.log("updatedTeams", updatedTeams);
    const boostedTeams = boostedTeamsPostRace(updatedTeams);
    console.log("boostedTeams", boostedTeams);
    setTeams(boostedTeams);
    // aggiorna il localStorage
    localStorage.setItem("teams", JSON.stringify(boostedTeams));
    // resetta lo stato della gara
    setCarsRaceState((prev) =>
      prev.map((carState) => ({
        ...carState,
        finalPosition: null,
        meters: 1,
        currentSpeed: 1,
        car: {
          ...carState.car,
          status: 100,
        },
      }))
    );
    setRaceState("fine gara");
  };

  return (
    <Column>
      <h3>Velocità gara:</h3>
      <Row>
        <SpeedButton variant="contained" onClick={() => setSpeed(250)}>
          Slow
        </SpeedButton>
        <SpeedButton variant="contained" onClick={() => setSpeed(125)}>
          Normal
        </SpeedButton>
        <SpeedButton variant="contained" onClick={() => setSpeed(50)}>
          Fast
        </SpeedButton>
        <SpeedButton
          variant="contained"
          onClick={() => setSpeed(100000000000000)}
        >
          Stop
        </SpeedButton>
      </Row>
      <DrawTrack
        tiles={track.tiles}
        cars={carsRaceState.map((car) => ({
          img: car.car.image,
          tile: Math.round(car.meters / 1000),
        }))}
      />
      {raceIsOver && (
        <>
          <Column style={{ marginTop: "24px" }}>
            <h3>🏁 Podio finale</h3>
            {podium.map(({ carState, position }) => (
              <Row
                key={carState.car.name}
                style={{
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "1.5em", marginRight: "8px" }}>
                  {getPodiumEmoji(position)}
                </span>
                <strong
                  style={{
                    width: "24px",
                    textAlign: "right",
                    marginRight: "8px",
                  }}
                >
                  {position}
                </strong>
                <span>
                  {carState.car.name} ({getTeamName(carState.car, teams)}) -{" "}
                  {Math.round(carState.meters)}m - Status: {carState.car.status}
                  %
                </span>
              </Row>
            ))}
          </Column>
          <Button variant="contained" onClick={handleRaceIsOver}>
            Vai alla classifica
          </Button>
        </>
      )}
    </Column>
  );
};

export default RaceHandler;

const SpeedButton = styled(Button)(() => ({ marginRight: `10px` }));
