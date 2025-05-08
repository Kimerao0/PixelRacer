import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, styled } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSection from "./sections/MainSection";
import TeamsSection from "./sections/TeamsSection";
import theme from "./style/theme";
import { RaceTeam } from "./dto";
import EditTeamPage from "./sections/TeamsSection/components/editTeamPage";
import Header from "./components/Header";
import RaceTrackPage from "./sections/TrackSection/RaceTrackPage";
import RacePage from "./sections/RaceSection/RacePage";
import CarInfo from "./components/CarInfo";

const App: React.FC = () => {
  const teamsFromLocalStorage = localStorage.getItem("teams");
  const [teams, setTeams] = useState<RaceTeam[]>(
    teamsFromLocalStorage ? JSON.parse(teamsFromLocalStorage) : []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <MainWrapper>
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route
              path="/race"
              element={<RacePage teams={teams} setTeams={setTeams} />}
            />
            <Route
              path="/teams"
              element={<TeamsSection teams={teams} setTeams={setTeams} />}
            />
            <Route
              path="/teams/:teamName"
              element={<EditTeamPage teams={teams} setTeams={setTeams} />}
            />
            <Route
              path="/track/:trackId"
              element={<RaceTrackPage teams={teams} setTeams={setTeams} />}
            />
            <Route path="/carInfo" element={<CarInfo />} />
          </Routes>
        </MainWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;

const MainWrapper = styled("div")({
  width: `100%`,
  minHeight: "calc(100vh - 50px)",
  height: `100%`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  backgroundColor: `#F3E9D7`,
  color: `#585858`,
});
