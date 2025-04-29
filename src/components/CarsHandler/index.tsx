import React, { useState } from "react";
import { Button, Grid2, styled, Typography } from "@mui/material";
import { RaceTeam } from "../../dto";
import PlayerCard from "../PlayerCard";
import CreatePlayerModal from "../CreatePlayerModal";
import ImageColorCounter from "..";

const CarsHandler: React.FC = () => {
  const [players, setPlayers] = useState<RaceTeam[]>([]);
  const [createPlayerModalIsOpen, setCreatePlayerModalIsOpen] = useState(false);

  return (
    <>
      <GridContainer container>
        <Grid2 size={6}>
          <Typography variant="h4">Players:</Typography>
          {players.map((player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
          <Button
            variant="contained"
            onClick={() => setCreatePlayerModalIsOpen((prev) => !prev)}
          >
            Add Player
          </Button>
        </Grid2>
        <Grid2 size={6}>
          <ImageColorCounter />
        </Grid2>
      </GridContainer>
      <CreatePlayerModal
        isOpen={createPlayerModalIsOpen}
        openHandler={setCreatePlayerModalIsOpen}
        setPlayers={setPlayers}
      />
    </>
  );
};

export default CarsHandler;

const GridContainer = styled(Grid2)({
  width: 1440,
});
