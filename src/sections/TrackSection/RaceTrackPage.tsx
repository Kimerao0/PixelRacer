import React, { useEffect, useState } from "react";
import { RaceTeam } from "../../dto";
import { useNavigate, useParams } from "react-router-dom";
import { tracks } from "../../data/tracks";
import DrawTrack from "./drawTrack";
import { Column, Row } from "../../style";
import { Button } from "@mui/material";

type Props = {
  teams: RaceTeam[];
  setTeams: React.Dispatch<React.SetStateAction<RaceTeam[]>>;
};

const RaceTrackPage: React.FC<Props> = () => {
  const [straight, setStraight] = useState<number>(0);
  const [turn, setTurn] = useState<number>(0);
  const [offroad, setOffroad] = useState<number>(0);

  const { trackId } = useParams<{ trackId: string }>();
  const track = tracks.find((track) => track.trackId === trackId);
  if (!track) {
    return <p>Track not found</p>;
  }
  const navigate = useNavigate();
  const handlePrev = () => {
    if (trackId === "1") {
      navigate("/track/10");
      return;
    }
    navigate(`/track/${Number(trackId) - 1}`);
  };
  const handleNext = () => {
    if (trackId === "10") {
      navigate("/track/1");
      return;
    }
    navigate(`/track/${Number(trackId) + 1}`);
  };

  useEffect(() => {
    const straightCount = track.tiles.filter(
      (tile) => tile.terrain === "straight"
    ).length;
    const turnCount = track.tiles.filter(
      (tile) => tile.terrain === "turn"
    ).length;
    const offroadCount = track.tiles.filter(
      (tile) => tile.terrain === "offroad"
    ).length;

    setStraight(straightCount);
    setTurn(turnCount);
    setOffroad(offroadCount);
  }, [trackId]);

  return (
    <Column sx={{ padding: 4, maxWidth: 1600 }}>
      <h2>{track.name}</h2>
      <img
        src={track.image}
        alt={track.name}
        style={{ width: "fit-content", height: "275px" }}
      />
      <p>{track.description}</p>
      <div>
        <DrawTrack tiles={track.tiles} />
      </div>
      <div
        style={{
          marginTop: 50,
        }}
      >
        <h3>Statistiche del tracciato:</h3>
        <p>
          <strong>Lunghezza totale: </strong>
          {track.tiles.length}km
        </p>
        <p>
          <strong>Rettilinei: </strong>
          {straight}km
        </p>
        <p>
          <strong>Curve: </strong>
          {turn}km
        </p>
        <p>
          <strong>Sezioni Offroad: </strong>
          {offroad}km
        </p>
      </div>
      <Row
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Button variant="contained" onClick={handlePrev}>
          Pista precedente
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Pista successiva
        </Button>
      </Row>
    </Column>
  );
};

export default RaceTrackPage;
