import { track_1 } from "./track_1";
import { track_2 } from "./track_2";

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

export const tracks: RaceTrack[] = [track_1, track_2];
