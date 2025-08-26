import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useDroneStore } from "../stores/droneStors";
// import { useMapStore } from "../stores/mapboxMapStore";
import type {
  DroneFeatureCollection,
  DroneFeatureProperties,
} from "../types/mapTypes";
import type { Feature, Geometry } from "geojson";
import { getStatusColor } from "../utils/droneUtils";
export function useDroneWebSocket() {
  // const { map } = useMapStore();
  const setDrones = useDroneStore((state) => state.setDrones);

  useEffect(() => {
    const socket: Socket = io("http://localhost:9013", {
      transports: ["polling"],
    });

    socket.on("connect", () => {
      console.log("Socket.IO connected", socket.id);
    });

    socket.on("message", (data) => {
      // Get current drones from store
      const existingDrones = [...useDroneStore.getState().drones];

      const featureCollection: DroneFeatureCollection = data;
      const newFeature = featureCollection.features[0];

      const existingIndex = existingDrones.findIndex(
        (drone) =>
          drone.properties?.registration === newFeature.properties?.registration
      );

      if (existingIndex !== -1) {
        const existingDrone = existingDrones[existingIndex];
        existingDrone.geometry.coordinates.push(
          newFeature.geometry.coordinates
        );
        existingDrone.properties = {
          ...newFeature.properties,
          statusColor: getStatusColor(newFeature.properties.registration),
        };

        existingDrones[existingIndex] = existingDrone;
      } else {
        const lineFeature: Feature<Geometry, DroneFeatureProperties> = {
          ...newFeature,
          geometry: {
            type: "LineString",
            coordinates: [newFeature.geometry.coordinates],
          },
          properties: {
            ...newFeature.properties,
            statusColor: getStatusColor(newFeature.properties.registration),
          },
        };

        existingDrones.push(lineFeature);
      }

      setDrones(existingDrones);
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
  }, [setDrones]);
}
