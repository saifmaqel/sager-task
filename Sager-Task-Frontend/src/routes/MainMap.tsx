import { useDocumentTitle } from "@mantine/hooks";
import { useDroneWebSocket } from "../hooks/useDroneWebSocket";
import { Box } from "@mantine/core";
import { MapboxMapContainer } from "../components/main-map/MapboxMapContainer";
import { DronesPanel } from "../components/main-map/drones-panel/DronesPanel";

import "mapbox-gl/dist/mapbox-gl.css";

function MainMap() {
  useDocumentTitle("SAGER - Map");
  useDroneWebSocket();

  return (
    <Box flex={1}>
      <MapboxMapContainer />
      <DronesPanel />
    </Box>
  );
}

export default MainMap;
