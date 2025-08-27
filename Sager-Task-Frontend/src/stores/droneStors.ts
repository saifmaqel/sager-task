import { create } from "zustand";
import type { Feature, LineString } from "geojson";
import type { DroneFeatureProperties } from "../types/mapTypes";

interface DroneState {
  drones: Feature<LineString, DroneFeatureProperties>[];
  setDrones: (d: Feature<LineString, DroneFeatureProperties>[]) => void;
}

export const useDroneStore = create<DroneState>((set) => ({
  drones: [],
  setDrones: (drones) => set({ drones }),
}));
