import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F0544F", // nuovo colore principale
      contrastText: "#ffffff", // testo bianco sui pulsanti
    },
    text: {
      primary: "#585858", // colore del testo principale
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // niente tutto maiuscolo
          fontWeight: "bold",
          borderRadius: 4,
        },
      },
      defaultProps: {
        color: "primary", // Imposta automaticamente il colore
      },
    },
  },
});

export default theme;
