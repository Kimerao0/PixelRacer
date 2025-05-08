import { track_1 } from "./track_1";
import { track_2 } from "./track_2";
import { track_3 } from "./track_3";
import { track_4 } from "./track_4";
import { track_5 } from "./track_5";
import { track_6 } from "./track_6";
import { track_7 } from "./track_7";
import { track_8 } from "./track_8";
import { track_9 } from "./track_9";
import { track_10 } from "./track_10";
import { track_12 } from "./track_12";

export type Terrain = "straight" | "turn" | "offroad";

export interface TrackTile {
  terrain: Terrain;
}

export interface RaceTrack {
  name: string;
  image: string;
  description: string;
  trackId: string;
  tiles: TrackTile[];
}

export const tracks: RaceTrack[] = [
  track_1,
  track_2,
  track_3,
  track_4,
  track_5,
  track_6,
  track_7,
  track_8,
  track_9,
  track_10,
  track_12,
];
