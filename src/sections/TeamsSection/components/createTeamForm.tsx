import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { RaceTeam } from "../../../dto";

const CreateTeamForm: React.FC<{
  setCreateModeOn: React.Dispatch<React.SetStateAction<boolean>>;
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
}> = ({ setCreateModeOn, teams, setTeams }) => {
  const [teamName, setTeamName] = useState("");

  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleCreateTeam = () => {
    if (teamName.trim() === "" || teamName.trim().length < 4) {
      alert("Please enter a team name longer than 3 letters.");
      return;
    }

    if (teams.some((team) => team.name === teamName)) {
      alert(`Team "${teamName}" already exists.`);
      return;
    }

    const newTeam: RaceTeam = {
      name: teamName,
      credits: 100,
      cars: [],
      upgrades: [],
    };

    const updatedTeams = [...teams, newTeam];
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setTeams(updatedTeams);
    setCreateModeOn(false);
    alert(`Team "${teamName}" created successfully!`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        pt: 4,
        pb: 4,
        maxWidth: 456,
      }}
    >
      <TextField
        label="Nome Team"
        value={teamName}
        onChange={handleTeamNameChange}
        variant="outlined"
        fullWidth
      />
      <Button variant="contained" onClick={handleCreateTeam}>
        Crea!
      </Button>
    </Box>
  );
};

export default CreateTeamForm;
