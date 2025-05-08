import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { RaceTeam } from "../../dto";
import { RaceState } from "./RacePage";
import confetti from "canvas-confetti";
// Props del componente
interface TeamRankingProps {
  teams: RaceTeam[];
  setCurrentTrack: React.Dispatch<React.SetStateAction<number>>;
  setRaceState: React.Dispatch<React.SetStateAction<RaceState>>;
}

// Componente che ordina e renderizza la classifica con Material UI
const TeamRanking: React.FC<TeamRankingProps> = ({
  teams,
  setCurrentTrack,
  setRaceState,
}) => {
  // Copia e ordina i team per punti discendenti
  const sortedTeams = React.useMemo(
    () => [...teams].sort((a, b) => b.punti - a.punti),
    [teams]
  );

  // Quando il componente monta, esplode i confetti
  React.useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const handleNextRace = () => {
    setCurrentTrack((currentTrack) =>
      currentTrack < 10 ? currentTrack + 1 : 1
    );
    setRaceState("pre-gara");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Classifica Campionato
          </Typography>
          <List>
            {sortedTeams.map((team, index) => {
              // Colori trofei
              const trophyColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // oro, argento, bronzo
              return (
                <React.Fragment key={team.name}>
                  <ListItem sx={{ "&:hover": { bgcolor: "action.hover" } }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: index < 3 ? "transparent" : "primary.main",
                          width: 40,
                          height: 40,
                        }}
                      >
                        {index < 3 ? (
                          <EmojiEventsIcon
                            sx={{ color: trophyColors[index], fontSize: 32 }}
                          />
                        ) : (
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {index + 1}
                          </Typography>
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                          {team.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {team.punti || 0} pts
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < sortedTeams.length - 1 && <Divider component="li" />}
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        sx={{ width: "100%", mt: 4 }}
        onClick={handleNextRace}
      >
        Prossima Gara!
      </Button>
    </Box>
  );
};

export default TeamRanking;
