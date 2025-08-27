import { create } from "zustand";
import type { GeoJSONFeature } from "mapbox-gl";

interface ClickedFeatureOnTheMapStoreState {
  clickedFeature: GeoJSONFeature | null;
  setClickedFeature: (d: GeoJSONFeature | null) => void;
}

export const useClickedFeatureOnTheMapStore =
  create<ClickedFeatureOnTheMapStoreState>((set) => ({
    clickedFeature: null,
    setClickedFeature: (feature) =>
      set((state) =>
        state.clickedFeature?.properties?.registration ===
        feature?.properties?.registration
          ? state
          : { clickedFeature: feature }
      ),
  }));
