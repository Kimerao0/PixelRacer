import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, LinearProgress } from "@mui/material";
import { AdditionalMetrics, CarDimensions, GroupCounts } from "..";
import { calcolaVelocitaMassima } from "../../../functions/topspeed";
import { calcolaManovrabilita } from "../../../functions/maneuverability";
import { DataSection } from "./DataSection";
import ProgressData from "./ProgressData";

interface CarDataProps {
  dimensions: CarDimensions;
  additionalMetrics: AdditionalMetrics;
  balance: number;
  groupCounts: GroupCounts;
  weight: number;
}

const CarData: React.FC<CarDataProps> = ({
  dimensions,
  additionalMetrics,
  balance,
  groupCounts,
  weight,
}) => {
  const [maxSpeed, setMaxSpeed] = useState<string>("");
  const [maxManeuverability, setMaxManeuverability] = useState<string>("");

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
  }, [dimensions, additionalMetrics, weight, balance]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 3,
        mt: 5,
      }}
    >
      {/* Colonna sinistra */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {dimensions && (
          <DataSection title="Dimensioni">
            <Typography>Larghezza carrozzeria: {dimensions.width}px</Typography>
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
          <Typography>Gomme: {groupCounts.gomme}px</Typography>
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
          </DataSection>
        )}
      </Paper>

      {/* Colonna destra */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
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
            </DataSection>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default CarData;
