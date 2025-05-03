import React, { useState } from "react";
import { SiteSection } from "../../App";
import { Button, styled } from "@mui/material";
import { Column, Row } from "../../style";
import CreateTeamForm from "./components/createTeamForm";
import { RaceTeam } from "../../dto";
import TeamCard from "./components/teamCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const TeamsSection: React.FC<{
  setActiveSection: React.Dispatch<React.SetStateAction<SiteSection>>;
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
}> = ({ setActiveSection, teams, setTeams }) => {
  const [createModeOn, setCreateModeOn] = useState<boolean>(false);

  return (
    <TeamsSectionWrapper>
      <Column style={{ padding: 24 }}>
        <h2>Gestione delle squadre:</h2>
        <Row>
          <Button
            variant="contained"
            size="large"
            sx={{ marginRight: `15px` }}
            onClick={() => setCreateModeOn(true)}
          >
            Aggiungi una squadra
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
          <Row sx={{ pt: 2, gap: 4 }}>
            {teams.map((team) => (
              <TeamCard
                key={team.name}
                name={team.name}
                credits={team.credits}
                cars={team.cars}
                upgrades={team.upgrades}
              />
            ))}
          </Row>
        ) : (
          <p>Nessuna squadra disponibile.</p>
        )}
        <Button
          variant="outlined"
          size="large"
          sx={{ maxWidth: `200px`, marginTop: `48px` }}
          onClick={() => setActiveSection("main")}
        >
          <ArrowBackIosIcon sx={{ fontSize: 20 }} /> Torna alla home
        </Button>
      </Column>
    </TeamsSectionWrapper>
  );
};

export default TeamsSection;

const TeamsSectionWrapper = styled("div")({
  width: `100%`,
  height: `100%`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
});
