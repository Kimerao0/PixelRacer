import React, { useState } from "react";
import { Button, Modal, styled, TextField } from "@mui/material";
import { Player } from "../../dto";
import { Row } from "../../style";

interface CreatePlayerModalProps {
  isOpen: boolean;
  openHandler: (value: React.SetStateAction<boolean>) => void;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

const CreatePlayerModal: React.FC<CreatePlayerModalProps> = ({
  isOpen,
  openHandler,
  setPlayers,
}) => {
  const [playerName, setPlayerName] = useState<string>("");
  const handleCreatePlayer = () => {
    if (playerName) {
      const newPlayer: Player = {
        name: playerName,
        cars: [],
        credits: 100,
        upgrades: [],
      };
      setPlayers((prev) => [...prev, newPlayer]);
      openHandler((prev) => !prev);
    }
  };
  return (
    <CustomModal open={isOpen} onClose={() => openHandler(false)}>
      <CustomModalBody>
        <TextField
          label="Player Name"
          variant="outlined"
          fullWidth
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <ModalFooter>
          <Button variant="contained" onClick={handleCreatePlayer}>
            Add Player
          </Button>
          <Button
            variant="contained"
            onClick={() => openHandler((prev) => !prev)}
          >
            Close
          </Button>
        </ModalFooter>
      </CustomModalBody>
    </CustomModal>
  );
};

export default CreatePlayerModal;

const CustomModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const CustomModalBody = styled("div")({
  padding: 20,
  width: 500,
  height: "fit-content",
  minHeight: 300,
  backgroundColor: "#242424",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ModalFooter = styled(Row)({
  width: "100%",
  justifyContent: "space-around",
});
