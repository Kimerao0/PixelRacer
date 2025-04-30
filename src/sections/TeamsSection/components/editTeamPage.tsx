import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { RaceTeam } from "../../../dto";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGoHome } from "../../../hooks/useGoHome";
import { Column, Row } from "../../../style";

type Props = {
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
};

const EditTeamPage: React.FC<Props> = ({ teams, setTeams }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { teamName } = useParams<{ teamName: string }>();
  const team = teams.find((t) => t.name === teamName);
  const goHome = useGoHome();

  if (!team) {
    goHome();
    return <p>Team not found</p>;
  }

  const deleteTeam = (teamName: string | null) => {
    if (!teamName) return;
    const updatedTeams = teams.filter((team) => team.name !== teamName);
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setOpenDeleteModal(false);
    alert(`Team "${teamName}" deleted successfully!`);
  };

  return (
    <Column>
      <Row style={{ alignItems: "center" }}>
        <h2>Modifica team: {team.name}</h2>
        <Box sx={{ ml: 6 }}>
          <IconButton
            onClick={() => setOpenDeleteModal(true)}
            aria-label="delete"
          >
            <DeleteIcon sx={{ color: "#F0544F" }} />
          </IconButton>
        </Box>
      </Row>
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare il team "{team.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
            Annulla
          </Button>
          <Button
            onClick={() => deleteTeam(team.name)}
            color="error"
            variant="contained"
          >
            Sono sicuro
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" size="large">
        Aggiungi auto
      </Button>
    </Column>
  );
};

export default EditTeamPage;
