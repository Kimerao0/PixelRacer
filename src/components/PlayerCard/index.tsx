import React from "react";
import { Player } from "../../dto";
import { Typography } from "@mui/material";

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  const { name, cars, credits, upgrades } = player;
  return (
    <div>
      <Typography variant="h4">{name}</Typography>

      {cars.length > 0 &&
        cars.map((car) => (
          <div>
            <Typography variant="h5">{car.name}</Typography>
            <img src={car.image} alt={car.name} />
          </div>
        ))}
      <Typography variant="h5">Credits: {credits}</Typography>
      <Typography variant="h5">Upgrades:</Typography>
      {upgrades.length > 0 &&
        upgrades.map((upgrade) => (
          <div>
            <Typography variant="h6">{upgrade.name}</Typography>
            <Typography variant="body1">{upgrade.description}</Typography>
            <Typography variant="body1">Cost: {upgrade.cost}</Typography>
            <Typography variant="body1">
              Duration: {upgrade.duration}
            </Typography>
          </div>
        ))}
    </div>
  );
};

export default PlayerCard;
