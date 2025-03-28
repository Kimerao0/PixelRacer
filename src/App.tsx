import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, styled } from "@mui/material";
import CarsHandler from "./components/CarsHandler";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainWrapper>
        <CarsHandler />
      </MainWrapper>
    </ThemeProvider>
  );
};

export default App;

const MainWrapper = styled("div")({
  width: `100vw`,
  height: `100vh`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  backgroundColor: `#242424`,
  color: `#ffffff`,
});
