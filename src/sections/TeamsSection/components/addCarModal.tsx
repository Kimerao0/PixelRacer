import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CarUploader from "../../../components/ImageUploader";
import { RaceCar, RaceTeam } from "../../../dto";

const AddCarModal: React.FC<{
  teamName: string;
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
  openAddCarModal: boolean;
  setOpenAddCarModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ teamName, teams, setTeams, openAddCarModal, setOpenAddCarModal }) => {
  const [carData, setCarData] = useState<RaceCar | null>(null);

  const addCarToTeam = () => {
    const currentTeam = teams.find((team) => team.name === teamName);
    if (!currentTeam) {
      alert("No team found!");
      return;
    }
    if (!carData) {
      alert("No car found!");
      return;
    }
    // checks if a car with the same name already exists
    const carExists = currentTeam.cars.some((car) => car.name === carData.name);
    if (carExists) {
      alert("Car with the same name already exists in the team!");
      return;
    }
    currentTeam.credits -= carData.carPrice;

    if (currentTeam.credits < 0) {
      alert("Not enough credits to add this car!");
      currentTeam.credits += carData.carPrice; // revert the credit deduction
      return;
    }
    currentTeam.cars.push(carData);
    const updatedTeams = teams.map((team) =>
      team.name === teamName ? currentTeam : team
    );
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setCarData(null);
    setOpenAddCarModal(false);
    alert("Car added to team successfully!");
  };
  console.log("carData", carData);
  return (
    <Dialog
      open={openAddCarModal}
      onClose={() => setOpenAddCarModal(false)}
      maxWidth="md"
    >
      <DialogTitle>Aggiungi una nuova auto</DialogTitle>
      <DialogContent>
        <CarUploader setCarData={setCarData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenAddCarModal(false)} color="primary">
          Annulla
        </Button>
        <Button
          onClick={() => addCarToTeam()}
          color="error"
          variant="contained"
          disabled={!carData || !carData.name || !carData.carPrice}
        >
          Aggiungi auto al team
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCarModal;
