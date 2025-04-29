import React, { useState } from "react";
import { SiteSection } from "../../App";
import { Button, styled } from "@mui/material";
import { Column, Row } from "../../style";
import CreateTeamForm from "./components/createTeamForm";
import { RaceTeam } from "../../dto";

const TeamsSection: React.FC<{
  setActiveSection: React.Dispatch<React.SetStateAction<SiteSection>>;
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
}> = ({ setActiveSection, teams, setTeams }) => {
  const [createModeOn, setCreateModeOn] = useState<boolean>(false);
  return (
    <TeamsSectionWrapper>
      <Column>
        <h3>Gestione delle squadre:</h3>
        <Row>
          <Button
            variant="contained"
            size="large"
            sx={{ marginRight: `15px` }}
            onClick={() => setCreateModeOn(true)}
          >
            Aggiungi una squadra
          </Button>{" "}
          <Button
            variant="outlined"
            size="large"
            onClick={() => setActiveSection("main")}
          >
            Torna al menu principale
          </Button>
        </Row>
        {createModeOn && (
          <CreateTeamForm
            setCreateModeOn={setCreateModeOn}
            teams={teams}
            setTeams={setTeams}
          />
        )}
        {teams.length > 0 ? (
          <Row>
            {teams.map((team) => (
              <div key={team.name}>
                <h4>{team.name}</h4>
                <p>Crediti: {team.credits}</p>
                <p>Auto: {team.cars.length}</p>
                <p>Upgrades: {team.upgrades.length}</p>
              </div>
            ))}
          </Row>
        ) : (
          <p>Nessuna squadra disponibile.</p>
        )}
      </Column>
    </TeamsSectionWrapper>
  );
};

export default TeamsSection;

const TeamsSectionWrapper = styled("div")({
  width: `100vw`,
  height: `100vh`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
});
