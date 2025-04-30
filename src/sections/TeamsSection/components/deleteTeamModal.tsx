import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { RaceTeam } from "../../../dto";

const DeleteTeamModal: React.FC<{
  teamName: string;
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
}> = ({ teamName, openDeleteModal, setOpenDeleteModal, teams, setTeams }) => {
  const deleteTeam = () => {
    if (!teamName) return;
    const updatedTeams = teams.filter((team) => team.name !== teamName);
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setOpenDeleteModal(false);
    alert(`Team "${teamName}" deleted successfully!`);
  };
  return (
    <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <DialogTitle>Conferma eliminazione</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sei sicuro di voler eliminare il team "{teamName}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteModal(false)} color="primary">
          Annulla
        </Button>
        <Button onClick={() => deleteTeam()} color="error" variant="contained">
          Sono sicuro
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTeamModal;
