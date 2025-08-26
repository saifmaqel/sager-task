import { create } from "zustand";
import type { Feature, Geometry } from "geojson";
import type { DroneFeatureProperties } from "../types/mapTypes";

interface DroneState {
  drones: Feature<Geometry, DroneFeatureProperties>[];
  setDrones: (d: Feature<Geometry, DroneFeatureProperties>[]) => void;
}

export const useDroneStore = create<DroneState>((set) => ({
  drones: [],
  setDrones: (drones) => set({ drones }),
}));
