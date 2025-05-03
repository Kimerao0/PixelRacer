import React from "react";
import { TrackTile } from "../../data/tracks";
import { styled } from "@mui/material";

const DrawTrack: React.FC<{ tiles: TrackTile[] }> = ({ tiles }) => {
  return (
    <TrackWrapper>
      {tiles.map((tile, index) => (
        <Tile
          key={index}
          style={{
            backgroundColor:
              tile.terrain === "straight"
                ? "gray"
                : tile.terrain === "turn"
                ? "#1f0eff"
                : "#491900",
          }}
        />
      ))}
    </TrackWrapper>
  );
};

export default DrawTrack;

const TrackWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(25, 1fr)",
  gap: "70px 5px",
  width: "100%",
  height: "100%",
  paddingTop: "50px",
  minWidth: 1420,
});
const Tile = styled("div")({
  width: "100%",
  height: 30,
});
