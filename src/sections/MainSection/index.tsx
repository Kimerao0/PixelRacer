import React from "react";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import Logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const MainSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        py: 8,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={5} alignItems="center" textAlign="center">
          <Box
            component="img"
            src={Logo}
            alt="PixelRacer Logo"
            sx={{ width: 458, height: 402 }}
          />

          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            color="text.primary"
          >
            Crea. Gareggia. Vinci.
          </Typography>

          <Typography variant="h6" color="text.secondary" maxWidth="1200px">
            Carica la tua auto in pixel art, ottieni statistiche basate sul tuo
            design e gareggia contro altre squadre per dominare la classifica.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("teams")}
            >
              Gestisci le squadre
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("race")}
            >
              Inizia la gara
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default MainSection;
