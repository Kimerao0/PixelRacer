import { Box, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import { RaceCar } from "../../../dto";
import DeleteIcon from "@mui/icons-material/Delete";
import { Row } from "../../../style";
import {
  calculateAccelerationPerTick,
  calculateSpeed,
} from "../../../functions/racefns";

const CarCard: React.FC<{
  index: number;
  car: RaceCar;
  handleCarDelete?: (carName: string) => void;
}> = ({ index, car, handleCarDelete }) => {
  const turnSpeed = calculateSpeed(
    car.stats.topSpeed,
    car.stats.maneuverability
  );
  const offSpeed = calculateSpeed(car.stats.topSpeed, car.stats.offroad);
  const accPerTick = calculateAccelerationPerTick(car.stats.acceleration);
  return (
    <Box
      key={index}
      sx={{
        border: "1px solid #585858",
        borderRadius: 2,
        padding: 2,
        backgroundColor: "#fff",
        mr: 2,
      }}
    >
      <Row sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontSize: 14, fontWeight: 600 }}
        >
          {car.name}
        </Typography>
        {handleCarDelete && (
          <Box>
            <IconButton
              onClick={() => handleCarDelete(car.name)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "#F0544F" }} />
            </IconButton>
          </Box>
        )}
      </Row>
      <img
        src={car.image}
        alt={car.name}
        style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
      />
      <Box mt={1}>
        {[
          { title: "Top Speed:", value: car.stats.topSpeed },
          { title: "Maneuverability:", value: car.stats.maneuverability },
          { title: "Acceleration:", value: car.stats.acceleration },
          { title: "Offroad:", value: car.stats.offroad },
          { title: "Durability:", value: car.stats.durability },
          { title: "Turn speed:", value: turnSpeed },
          { title: "Offroad speed:", value: offSpeed },
          { title: "Acceleration per tick:", value: accPerTick },
        ].map((stat, idx) => (
          <Typography
            key={idx}
            variant="caption"
            display="block"
            sx={{
              fontWeight: 500,
              fontSize: 14,
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <strong>{stat.title}</strong> {stat.value}
          </Typography>
        ))}
      </Box>
      <Box mt={1}>
        {car.activeUpgrades.map((upgrade, idx) => (
          <Chip
            key={idx}
            label={upgrade.name}
            sx={{ bgcolor: "#63A46C", color: "#fff", m: 0.5 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CarCard;
