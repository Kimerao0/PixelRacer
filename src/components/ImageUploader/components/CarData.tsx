import React, { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { AdditionalMetrics, CarDimensions, GroupCounts } from "..";
import { calcolaVelocitaMassima } from "../../../functions/topspeed";
import { calcolaManovrabilita } from "../../../functions/maneuverability";
import { DataSection } from "./DataSection";
import ProgressData from "./ProgressData";
import { calculateAcceleration } from "../../../functions/acceleration";
import { calculateOffRoad } from "../../../functions/offroad";
import { calculateDurability } from "../../../functions/durability";
import { RaceCar } from "../../../dto";

interface CarDataProps {
  dimensions: CarDimensions;
  additionalMetrics: AdditionalMetrics;
  balance: number;
  groupCounts: GroupCounts;
  weight: number;
  carImg: string;
  setCarData: React.Dispatch<React.SetStateAction<RaceCar | null>>;
}

const CarData: React.FC<CarDataProps> = ({
  dimensions,
  additionalMetrics,
  balance,
  groupCounts,
  weight,
  carImg,
  setCarData,
}) => {
  const [carName, setCarName] = useState<string>("");
  const [maxSpeed, setMaxSpeed] = useState<string>("");
  const [maxManeuverability, setMaxManeuverability] = useState<string>("");
  const [acceleration, setAcceleration] = useState<string>("");
  const [offRoad, setOffRoad] = useState<string>("");
  const [durability, setDurability] = useState<string>("");

  useEffect(() => {
    const _ms = calcolaVelocitaMassima(
      dimensions.width / additionalMetrics.wheelbase,
      weight,
      additionalMetrics.carrozzeriaDistanceFromGround,
      additionalMetrics.aerodynamicCoefficient
    ).toFixed(2);
    setMaxSpeed(_ms);
    const _mm = calcolaManovrabilita(
      additionalMetrics.wheelbase,
      additionalMetrics.centerOfMassHeight,
      weight,
      balance
    ).toFixed(2);
    setMaxManeuverability(_mm);
    const totalVolume =
      groupCounts.carrozzeria + groupCounts.vetro + groupCounts.gomme;
    const _acc = calculateAcceleration({
      weight,
      rearTyreVolumeRatio: totalVolume / groupCounts.gommeLeft,
      aerodynamicCoefficient: additionalMetrics.aerodynamicCoefficient,
    }).toFixed(2);
    setAcceleration(_acc);
    const _off = calculateOffRoad({
      ddt: additionalMetrics.carrozzeriaDistanceFromGround,
      vty: groupCounts.gomme,
      balance,
    }).toFixed(2);
    setOffRoad(_off);
    const _dur = calculateDurability({
      ddt: additionalMetrics.carrozzeriaDistanceFromGround,
      vty: groupCounts.gomme,
      weight,
    }).toFixed(2);
    setDurability(_dur);
    setCarData({
      name: carName,
      image: carImg,
      stats: {
        topSpeed: Number(_ms),
        maneuverability: Number(_mm),
        offroad: Number(_off),
        durability: Number(_dur),
        acceleration: Number(_acc),
      },
      status: 100,
      activeUpgrades: [],
    });
  }, [dimensions, additionalMetrics, weight, balance, carName]);

  const handleCarNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarName(event.target.value);
  };

  return (
    <>
      <TextField
        label="Nome Auto"
        value={carName}
        onChange={handleCarNameChange}
        variant="outlined"
        sx={{ mt: 4, maxWidth: 400 }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mt: 5,
        }}
      >
        {/* Colonna sinistra */}
        <Box sx={{ p: 3 }}>
          {dimensions && (
            <DataSection title="Dimensioni">
              <Typography>
                Larghezza carrozzeria: {dimensions.width}px
              </Typography>
              <Typography>Altezza auto: {dimensions.height}px</Typography>
            </DataSection>
          )}

          {additionalMetrics && (
            <DataSection title="Metriche Addizionali">
              <Typography>
                Distanza carrozzeria da terra:{" "}
                {additionalMetrics.carrozzeriaDistanceFromGround}px
              </Typography>
              <Typography>
                Passo (wheelbase): {additionalMetrics.wheelbase.toFixed(2)}px
              </Typography>
              <Typography>
                Altezza centro massa:{" "}
                {additionalMetrics.centerOfMassHeight.toFixed(2)}px
              </Typography>
              <Typography>
                Coeff. aerodinamico (Cd):{" "}
                {additionalMetrics.aerodynamicCoefficient.toFixed(3)}
              </Typography>
            </DataSection>
          )}

          {balance !== null && (
            <DataSection title="Bilanciamento">
              <Typography>
                Retro/fronte: {balance.toFixed(2)} —{" "}
                {balance > 1
                  ? "sbilanciata verso il retro"
                  : balance < 1
                  ? "sbilanciata verso il fronte"
                  : "bilanciata"}
              </Typography>
            </DataSection>
          )}

          <DataSection title="Composizione">
            <Typography>Carrozzeria: {groupCounts.carrozzeria}px</Typography>
            <Typography>Vetro: {groupCounts.vetro}px</Typography>
            <Typography>Pneumatici: {groupCounts.gomme}px</Typography>
            <Typography mt={1}>
              Peso totale:{" "}
              {groupCounts.carrozzeria * 3 +
                groupCounts.vetro * 0.5 +
                groupCounts.gomme * 2}{" "}
              kg
            </Typography>
          </DataSection>

          {dimensions && additionalMetrics && weight && balance && (
            <DataSection title="Proporzioni">
              <Typography>
                Rapporto lunghezza/passo:{" "}
                {(dimensions.width / additionalMetrics.wheelbase).toFixed(2)}
              </Typography>
              <Typography>
                Rapporto volume gomme posteriori/anteriori:{" "}
                {(groupCounts.gommeLeft / groupCounts.gommeRight).toFixed(2)}
              </Typography>
            </DataSection>
          )}
        </Box>

        {/* Colonna destra */}
        <Box sx={{ p: 3, borderLeft: "1px solid #ccc" }}>
          {dimensions && additionalMetrics && weight && balance && (
            <>
              <DataSection title="Statistiche">
                <ProgressData
                  title={`Velocità massima: ${maxSpeed} km/h`}
                  value={maxSpeed}
                />
                <ProgressData
                  title={`Manovrabilità: ${maxManeuverability}`}
                  value={maxManeuverability}
                />
                <ProgressData
                  title={`Acceleration: ${acceleration}`}
                  value={acceleration}
                />
                <ProgressData title={`Offroad: ${offRoad}`} value={offRoad} />
                <ProgressData
                  title={`Durability: ${durability}`}
                  value={durability}
                />
              </DataSection>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CarData;
