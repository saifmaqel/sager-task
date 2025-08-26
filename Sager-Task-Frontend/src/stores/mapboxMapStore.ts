// import { useRef } from "react";
// import { create } from "zustand";

// interface MapboxMapState {
//    mapRef: React.RefObject<mapboxgl.Map | null>;
//   setMapRef: (mapRef: React.RefObject<mapboxgl.Map | null>) => void;
// }

// export const useMapBoxMapStore = create<MapboxMapState>((set) => ({
//   mapRef: useRef<mapboxgl.Map | null>(null),
//   setMapRef: (mapRef) => set({mapRef}),
// }));

import { create } from "zustand";

interface MapState {
  map: mapboxgl.Map | null;
  setMap: (map: mapboxgl.Map | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
}));
