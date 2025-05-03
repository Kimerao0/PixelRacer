import React, { useEffect, useState } from "react";
import { RaceCar, RaceTeam } from "../../dto";
import { tracks } from "../../data/tracks";
import { Column, Row } from "../../style";
import { Button, styled } from "@mui/material";
import {
  calculateAccelerationPerTick,
  calculateTopSpeed,
  getCarLimiter,
  getPodiumEmoji,
  getTeamName,
  neverGoOverTopSpeed,
} from "../../functions/racefns";
import DrawTrack from "../TrackSection/drawTrack";

export interface CarRaceState {
  car: RaceCar;
  meters: number;
  currentSpeed: number;
  finalPosition: number | null;
}

interface RaceResult {
  car: RaceCar;
  position: number;
}

const RaceHandler: React.FC<{
  cars: RaceCar[];
  currentTrack: number;
  teams: RaceTeam[];
}> = ({ cars, currentTrack, teams }) => {
  const initialCarState: CarRaceState[] = cars.map((car) => ({
    car: car,
    meters: 1,
    currentSpeed: 1,
    finalPosition: null,
  }));
  const [speed, setSpeed] = useState(1000);
  const [carsRaceState, setCarsRaceState] =
    useState<CarRaceState[]>(initialCarState);
  const [raceIsOver, setRaceIsOver] = useState(false);

  const track = tracks[currentTrack - 1];

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
            meters: finishLine,
            currentSpeed: 0,
            finalPosition: position,
          };
        }

        // altrimenti proseguiamo normalmente
        return {
          ...carState,
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
    if (carsRaceState.every((car) => car.finalPosition !== null)) {
      console.log("Gara finita!");
      setRaceIsOver(true);
    }
  }, [carsRaceState]);

  const podium = carsRaceState
    .filter((c) => c.finalPosition !== null)
    .sort((a, b) => (a.finalPosition as number) - (b.finalPosition as number));

  return (
    <Column>
      <h3>Velocità gara:</h3>
      <Row>
        <SpeedButton variant="contained" onClick={() => setSpeed(500)}>
          Slow
        </SpeedButton>
        <SpeedButton variant="contained" onClick={() => setSpeed(250)}>
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
      {podium.length > 0 && (
        <Column style={{ marginTop: "24px" }}>
          <h3>🏁 Podio finale</h3>
          {podium.map((c) => (
            <Row
              key={c.car.name}
              style={{
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "1.5em", marginRight: "8px" }}>
                {getPodiumEmoji(c.finalPosition!)}
              </span>
              <strong
                style={{
                  width: "24px",
                  textAlign: "right",
                  marginRight: "8px",
                }}
              >
                {c.finalPosition}
              </strong>
              <span>{c.car.name}</span>
              <span>
                {c.car.name} ({getTeamName(c.car, teams)})
              </span>
            </Row>
          ))}
        </Column>
      )}
    </Column>
  );
};

export default RaceHandler;

const SpeedButton = styled(Button)(() => ({ marginRight: `10px` }));
