import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useDroneStore } from "../stores/droneStors";
import type { DroneFeatureCollection } from "../types/mapTypes";
import type { Point } from "geojson";
import { updateDroneData, updateMapVisualization } from "../utils/mapUtils";
import { useMapboxMapContext } from "../context/mapboxContext";

export function useDroneWebSocket() {
  const { map } = useMapboxMapContext();
  const setDrones = useDroneStore((state) => state.setDrones);

  useEffect(() => {
    const socket: Socket = io("http://localhost:9013", {
      transports: ["polling"],
    });

    socket.on("connect", () => {
      console.log("Socket.IO connected", socket.id);
    });

    socket.on("message", (data) => {
      if (!map) return;
      const featureCollection: DroneFeatureCollection<Point> = data;
      const newFeature = featureCollection.features[0];
      const existingDrones = [...useDroneStore.getState().drones];

      updateDroneData(newFeature, existingDrones, setDrones);
      // Added the draw drones logic here to not create useEffect (might no need useEffect)
      updateMapVisualization(map, existingDrones);
    });

    socket.on("error", (err) => {
      console.error("WebSocket error:", err);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [setDrones, map]);
}
