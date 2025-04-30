import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { RaceTeam } from "../../../dto";
import { getInitials } from "../../../functions/stringsManipulation";
import { Link } from "react-router-dom";

const TeamCard: React.FC<RaceTeam> = ({ name, cars, credits, upgrades }) => {
  return (
    <Link to={`/teams/${name}`} style={{ textDecoration: "none" }}>
      <StyledCard>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#F6B600", fontSize: 16 }}>
              {getInitials(name)}
            </Avatar>
          }
          title={<Typography variant="h6">{name}</Typography>}
          subheader={
            <Typography variant="body2">Credits: {credits}</Typography>
          }
        />
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Cars
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            {cars.map((car, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid #585858",
                  borderRadius: 2,
                  padding: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="subtitle2" color="primary">
                  {car.name}
                </Typography>
                <img
                  src={car.image}
                  alt={car.name}
                  style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
                />
                <Box mt={1}>
                  <Typography variant="caption" display="block">
                    Status: {car.status}%
                  </Typography>
                  <Typography variant="caption" display="block">
                    Top Speed: {car.stats.topSpeed}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Maneuverability: {car.stats.maneuverability}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Durability: {car.stats.durability}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Acceleration: {car.stats.acceleration}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Offroad: {car.stats.offroad}
                  </Typography>
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
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            Available Upgrades
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {upgrades.map((upgrade, index) => (
              <Chip
                key={index}
                label={`${upgrade.name} ($${upgrade.cost})`}
                sx={{ bgcolor: "#F0544F", color: "#fff" }}
              />
            ))}
          </Box>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default TeamCard;

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: `#fff9e6`,
  color: "#000",
  padding: theme.spacing(1),
  borderRadius: 16,
  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
  border: "2px solid #63A46C",
  "&:hover": {
    boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.02)",
    cursor: "pointer",
  },
}));
