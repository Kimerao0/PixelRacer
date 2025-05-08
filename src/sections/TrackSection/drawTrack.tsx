import React from "react";
import { TrackTile } from "../../data/tracks";
import { styled } from "@mui/material";

const DrawTrack: React.FC<{
  tiles: TrackTile[];
  cars?: { img: string; tile: number }[];
}> = ({ tiles, cars }) => {
  return (
    <TrackWrapper>
      {tiles.map((tile, index) => {
        const rndNumber = Math.floor(Math.random() * 10000);
        return (
          <Tile
            key={`${index}-${rndNumber}`}
            style={{
              backgroundColor:
                tile.terrain === "straight"
                  ? "gray"
                  : tile.terrain === "turn"
                  ? "#1f0eff"
                  : "#491900",
              position: "relative",
            }}
          >
            {cars &&
              cars.map((car) => {
                if (car.tile === index) {
                  return (
                    <img
                      src={car.img}
                      style={{ width: 50, height: 25, position: "absolute" }}
                      key={`${car.img}-${rndNumber}`}
                    />
                  );
                }
                return null;
              })}
          </Tile>
        );
      })}
    </TrackWrapper>
  );
};

export default DrawTrack;

const TrackWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(25, 1fr)",
  gap: "10px 5px",
  width: "100%",
  height: "100%",
  paddingTop: "30px",
  minWidth: 1420,
});
const Tile = styled("div")({
  width: "100%",
  height: 30,
});
