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
    car,
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
        if (carState.finalPosition !== null) return carState;

        const newStatus = deterioramentoStatusAuto(
          carState.currentSpeed,
          carState.car.status,
          carState.car.stats.durability
        );

        if (newStatus <= 0) {
          return {
            ...carState,
            car: { ...carState.car, status: 0 },
            currentSpeed: 0,
          };
        }

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

        if (newMeters >= finishLine) {
          const position = alreadyFinishedCount + resultsToAdd.length + 1;
          resultsToAdd.push({ car: carState.car, position });
          return {
            ...carState,
            car: { ...carState.car, status: newStatus },
            meters: finishLine,
            currentSpeed: 0,
            finalPosition: position,
          };
        }

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

  // Effetto per determinare la fine gara e assegnare le posizioni mancanti
  useEffect(() => {
    if (raceIsOver) return;
    // La gara è finita quando tutte le macchine hanno finalPosition o sono ferme
    if (
      carsRaceState.every(
        (c) => c.finalPosition !== null || c.currentSpeed === 0
      )
    ) {
      // Assegna le posizioni anche alle auto ferme, in base ai metri percorsi
      setCarsRaceState((prev) => {
        // Ordina: prima quelle con finalPosition, poi le altre per metri
        const sorted = [...prev].sort((a, b) => {
          if (a.finalPosition !== null && b.finalPosition !== null)
            return a.finalPosition - b.finalPosition;
          if (a.finalPosition !== null) return -1;
          if (b.finalPosition !== null) return 1;
          return b.meters - a.meters;
        });
        // Mappa nome auto -> posizione finale
        const namePosMap = new Map<string, number>();
        sorted.forEach((cs, idx) => {
          namePosMap.set(cs.car.name, idx + 1);
        });
        // Aggiorna solo quelle senza finalPosition
        return prev.map((cs) => ({
          ...cs,
          finalPosition:
            cs.finalPosition !== null
              ? cs.finalPosition
              : namePosMap.get(cs.car.name)!,
        }));
      });
      setRaceIsOver(true);
    }
  }, [carsRaceState, raceIsOver]);

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
    const boostedTeams = boostedTeamsPostRace(updatedTeams);
    setTeams(boostedTeams);
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

  useEffect(() => {
    if (raceIsOver) {
      return;
    }
    const interval = setInterval(handleTick, speed);
    return () => clearInterval(interval);
  }, [speed, raceIsOver]);

  // Calcolo del podio: ordina per finalPosition (assegnata a tutti)
  const podium = carsRaceState
    .slice()
    .sort((a, b) => (a.finalPosition || 0) - (b.finalPosition || 0))
    .map((c) => ({ carState: c, position: c.finalPosition! }));

  return (
    <Column>
      <h2>Pista: {track.name}</h2>
      <img src={track.image} alt="Immagine Pista" style={{ width: 300 }} />
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
