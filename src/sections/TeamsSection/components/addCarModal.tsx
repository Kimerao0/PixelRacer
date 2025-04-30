import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import CarUploader from "../../../components/ImageUploader";

const AddCarModal: React.FC<{
  openAddCarModal: boolean;
  setOpenAddCarModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openAddCarModal, setOpenAddCarModal }) => {
  const addCarToTeam = () => {
    console.log("Car added to team");
    setOpenAddCarModal(false);
    alert("Car added to team successfully!");
  };
  return (
    <Dialog
      open={openAddCarModal}
      onClose={() => setOpenAddCarModal(false)}
      maxWidth="md"
    >
      <DialogTitle>Aggiungi una nuova macchina</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <CarUploader />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenAddCarModal(false)} color="primary">
          Annulla
        </Button>
        <Button
          onClick={() => addCarToTeam()}
          color="error"
          variant="contained"
        >
          Sono sicuro
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCarModal;
