import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { RaceTeam } from "../../../dto";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGoHome } from "../../../hooks/useGoHome";
import { Column, Row } from "../../../style";
import DeleteTeamModal from "./deleteTeamModal";
import AddCarModal from "./addCarModal";

type Props = {
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
};

const EditTeamPage: React.FC<Props> = ({ teams, setTeams }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddCarModal, setOpenAddCarModal] = useState<boolean>(false);

  const { teamName } = useParams<{ teamName: string }>();
  const team = teams.find((t) => t.name === teamName);
  const goHome = useGoHome();

  if (!team) {
    goHome();
    return <p>Team not found</p>;
  }

  return (
    <>
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

        <Button
          variant="contained"
          size="large"
          onClick={() => setOpenAddCarModal(true)}
        >
          Aggiungi auto
        </Button>
      </Column>
      {teamName && (
        <DeleteTeamModal
          teamName={teamName}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          teams={teams}
          setTeams={setTeams}
        />
      )}
      <AddCarModal
        openAddCarModal={openAddCarModal}
        setOpenAddCarModal={setOpenAddCarModal}
      />
    </>
  );
};

export default EditTeamPage;
