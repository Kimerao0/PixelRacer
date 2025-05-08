import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Column } from "../style";

const factors = [
  {
    title: "Velocità Massima",
    points: [
      "Rapporto lunghezza/passo: Minore è migliore",
      "Peso: Minore è migliore",
      "Distanza da terra: Minore è migliore",
      "Coefficiente aerodinamico: Minore è migliore",
    ],
  },
  {
    title: "Manovrabilità",
    points: [
      "Passo: Minore è migliore",
      "Altezza: Minore è migliore",
      "Peso: Minore è migliore",
      "Bilanciamento peso (anteriore/posteriore): Più vicino a 1 è migliore",
    ],
  },
  {
    title: "Fattore Offroad",
    points: [
      "Distanza da terra: Maggiore è migliore",
      "Volume delle gomme: Maggiore è migliore",
      "Bilanciamento peso (anteriore/posteriore): Più vicino a 1 è migliore",
    ],
  },
  {
    title: "Accelerazione",
    points: [
      "Peso: Minore è migliore",
      "Rapporto volume auto / gomme posteriori: Più vicino a 1 è migliore",
      "Coefficiente aerodinamico: Minore è migliore",
    ],
  },
  {
    title: "Durabilità",
    points: [
      "Distanza da terra: Maggiore è migliore",
      "Volume delle gomme: Minore è migliore",
      "Peso: Maggiore è migliore",
    ],
  },
];

const CarFactorsSummary: React.FC = () => {
  return (
    <Column sx={{ width: "100%", p: 4, display: "flex", alignItems: "center" }}>
      {factors.map((factor, index) => (
        <Card key={index} sx={{ marginBottom: 2, width: 600 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {factor.title}
            </Typography>
            <ul>
              {factor.points.map((point, idx) => (
                <li key={idx}>
                  <Typography variant="body1">{point}</Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </Column>
  );
};

export default CarFactorsSummary;
