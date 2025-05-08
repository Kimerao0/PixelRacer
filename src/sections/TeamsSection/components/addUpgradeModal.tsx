import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { RaceTeam, UpgradeName, upgrades } from "../../../dto";
import { getUpgradeImage } from "./editTeamPage";
import { Column, Row } from "../../../style";

const AddUpgradeModal: React.FC<{
  teamName: string;
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
  openAddUpgradeModal: boolean;
  setOpenAddUpgradeModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  teams,
  setTeams,
  teamName,
  openAddUpgradeModal,
  setOpenAddUpgradeModal,
}) => {
  const [selectedUpgrade, setSelectedUpgrade] =
    React.useState<UpgradeName | null>(null);
  const [upgradePrice, setUpgradePrice] = React.useState<number>(0);
  const addCarToTeam = () => {
    const currentTeam = teams.find((team) => team.name === teamName);
    if (!currentTeam) {
      alert("No team found!");
      return;
    }
    if (!selectedUpgrade) {
      alert("No upgrade found!");
      return;
    }

    if (!upgradePrice) {
      alert("Please set a price for the upgrade!");
      return;
    }

    currentTeam.credits -= upgradePrice;

    if (currentTeam.credits < 0) {
      alert("Not enough credits to add this upgrade!");
      currentTeam.credits += upgradePrice; // revert the credit deduction
      return;
    }

    // if the upgrade already exists, update the upgrade quantity
    const existingUpgrade = currentTeam.upgrades.find(
      (up) => up.name === selectedUpgrade
    );
    if (existingUpgrade) {
      existingUpgrade.quantity += 1;
      alert("Upgrade already exists in the team! Quantity updated.");
    } else {
      // if the upgrade doesn't exist, add it to the team
      currentTeam.upgrades.push({
        name: selectedUpgrade,
        quantity: 1,
        description: getUpgradeDescrition(selectedUpgrade),
      });
    }

    const updatedTeams = teams.map((team) =>
      team.name === teamName ? currentTeam : team
    );
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    setOpenAddUpgradeModal(false);
    alert("Upgrade added to team successfully!");
  };

  const handleUpgradePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpgradePrice(Number(event.target.value));
  };

  return (
    <Dialog
      open={openAddUpgradeModal}
      onClose={() => setOpenAddUpgradeModal(false)}
      maxWidth="md"
    >
      <DialogTitle>Aggiungi un upgrade</DialogTitle>
      <DialogContent>
        <Column>
          <Row sx={{ gap: 4, flexWrap: `wrap` }}>
            {[...upgrades].map((upgrade) => (
              <Button
                key={upgrade}
                variant="text"
                onClick={() => setSelectedUpgrade(upgrade)}
                sx={{
                  border: `3px solid ${
                    selectedUpgrade === upgrade ? "red" : "gray"
                  }`,
                }}
              >
                <img
                  src={getUpgradeImage(upgrade)}
                  alt={upgrade}
                  style={{ width: 70, height: "fit-content" }}
                />
              </Button>
            ))}
          </Row>

          <Typography variant="body2" sx={{ mt: 4 }}>
            {selectedUpgrade
              ? getUpgradeDescrition(selectedUpgrade)
              : "Seleziona un upgrade"}
          </Typography>

          <TextField
            label="Prezzo Upgrade"
            value={upgradePrice}
            type="number"
            onChange={handleUpgradePrice}
            variant="outlined"
            sx={{ maxWidth: 400, mt: 4 }}
          />
        </Column>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenAddUpgradeModal(false)} color="primary">
          Annulla
        </Button>
        <Button
          onClick={() => addCarToTeam()}
          color="error"
          variant="contained"
          disabled={!selectedUpgrade || !upgradePrice}
        >
          Aggiungi auto al team
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUpgradeModal;

export const getUpgradeDescrition = (upgradeName: UpgradeName) => {
  const baseDescription = "Aggiunge 100 al parametro";
  switch (upgradeName) {
    case "hyper-speed":
      return `Aggiunge 50 al parametro velocità massima`;
    case "precision":
      return `${baseDescription} manovrabilità`;
    case "rocket":
      return `${baseDescription} accelerazione`;
    case "suspensions":
      return `${baseDescription} offroad`;
    case "shield":
      return `${baseDescription} durabilità`;
    case "repair30":
      return `Ripara il 30% dello status dell'auto`;
    case "repair60":
      return `Ripara il 60% dello status dell'auto`;
  }
};
