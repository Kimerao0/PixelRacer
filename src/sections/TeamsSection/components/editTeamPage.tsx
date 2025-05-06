import React, { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { RaceTeam } from "../../../dto";
import DeleteIcon from "@mui/icons-material/Delete";
import { Column, Row } from "../../../style";
import DeleteTeamModal from "./deleteTeamModal";
import AddCarModal from "./addCarModal";
import CarCard from "./carCard";
import HSUP from "../../../data/upgrades/hyper-speed.png";
import SuUp from "../../../data/upgrades/suspensions.png";
import PrUp from "../../../data/upgrades/precision.png";
import RkUp from "../../../data/upgrades/rocket.png";
import ShUp from "../../../data/upgrades/shield.png";
import Re30Up from "../../../data/upgrades/repair30.png";
import Re60Up from "../../../data/upgrades/repair60.png";
import AddUpgradeModal from "./addUpgradeModal";

type Props = {
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
};

export const getUpgradeImage = (upgradeName: string) => {
  switch (upgradeName) {
    case "hyper-speed":
      return HSUP;
    case "suspensions":
      return SuUp;
    case "precision":
      return PrUp;
    case "rocket":
      return RkUp;
    case "shield":
      return ShUp;
    case "repair30":
      return Re30Up;
    case "repair60":
      return Re60Up;
    default:
      return "";
  }
};

const EditTeamPage: React.FC<Props> = ({ teams, setTeams }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddCarModal, setOpenAddCarModal] = useState<boolean>(false);
  const [openAddUpgradeModal, setOpenAddUpgradeModal] =
    useState<boolean>(false);

  const { teamName } = useParams<{ teamName: string }>();
  const team = teams.find((t) => t.name === teamName);
  const navigate = useNavigate();
  if (!team) {
    navigate("/teams");
    return <p>Team not found</p>;
  }

  const handleCarDelete = (carName: string) => {
    const updatedCars = team.cars.filter((car) => car.name !== carName);
    const updatedTeam = { ...team, cars: updatedCars };
    const updatedTeams = teams.map((t) =>
      t.name === teamName ? updatedTeam : t
    );
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  return (
    <>
      <Column>
        <h2>Modifica team:</h2>
        <Row style={{ alignItems: "center" }}>
          <h3>
            {team.name} (Crediti: {team.credits})
          </h3>
          <Box sx={{ ml: 6 }}>
            <IconButton
              onClick={() => setOpenDeleteModal(true)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "#F0544F" }} />
            </IconButton>
          </Box>
        </Row>

        <Button
          variant="contained"
          size="large"
          onClick={() => setOpenAddCarModal(true)}
        >
          Aggiungi auto
        </Button>
        {teamName && (
          <DeleteTeamModal
            teamName={teamName}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            teams={teams}
            setTeams={setTeams}
          />
        )}
        {teamName && (
          <AddCarModal
            teamName={teamName}
            teams={teams}
            setTeams={setTeams}
            openAddCarModal={openAddCarModal}
            setOpenAddCarModal={setOpenAddCarModal}
          />
        )}
        {team.cars.length > 0 && (
          <>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontSize: 20, fontWeight: 600, mt: 4, mb: 2 }}
            >
              Auto del team:
            </Typography>
            <Row>
              {team.cars.map((car, index) => (
                <CarCard
                  key={index}
                  index={index}
                  car={car}
                  handleCarDelete={handleCarDelete}
                />
              ))}
            </Row>
          </>
        )}
        <Button
          variant="contained"
          size="large"
          onClick={() => setOpenAddUpgradeModal(true)}
          sx={{ mt: 4 }}
        >
          Aggiungi upgrade
        </Button>
        {team.upgrades.length > 0 && (
          <>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontSize: 20, fontWeight: 600, mt: 4, mb: 2 }}
            >
              Upgrades del team:
            </Typography>
            <Row>
              {team.upgrades
                .filter((up) => up.quantity !== 0)
                .map((up, index) => (
                  <Row key={index} sx={{ mr: 3 }}>
                    <img
                      src={getUpgradeImage(up.name)}
                      alt={up.name}
                      style={{ width: 70, marginRight: 6 }}
                    />
                    <p>
                      <strong>x{up.quantity}</strong>
                    </p>
                  </Row>
                ))}
            </Row>
          </>
        )}
        {teamName && (
          <AddUpgradeModal
            teamName={teamName}
            teams={teams}
            setTeams={setTeams}
            openAddUpgradeModal={openAddUpgradeModal}
            setOpenAddUpgradeModal={setOpenAddUpgradeModal}
          />
        )}
      </Column>
    </>
  );
};

export default EditTeamPage;
