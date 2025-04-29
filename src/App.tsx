import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, styled } from "@mui/material";
import MainSection from "./sections/MainSection";
import theme from "./style/theme";
import TeamsSection from "./sections/TeamsSection";
import { RaceTeam } from "./dto";

export type SiteSection = "main" | "teams" | "race";

const App: React.FC = () => {
  const teamsFromLocalStorage = localStorage.getItem("teams");
  const [activeSection, setActiveSection] = useState<SiteSection>("main");
  const [teams, setTeams] = useState<RaceTeam[]>(
    teamsFromLocalStorage ? JSON.parse(teamsFromLocalStorage) : []
  );

  const returnComponentBasedOnSection = () => {
    switch (activeSection) {
      case "main":
        return <MainSection setActiveSection={setActiveSection} />;
      case "teams":
        return (
          <TeamsSection
            setActiveSection={setActiveSection}
            teams={teams}
            setTeams={setTeams}
          />
        );
      case "race":
        return <p>Race page</p>;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainWrapper>{returnComponentBasedOnSection()}</MainWrapper>
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
  backgroundColor: `#F3E9D7`,
  color: `#585858`,
});
