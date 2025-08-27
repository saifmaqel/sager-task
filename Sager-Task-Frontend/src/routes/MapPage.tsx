import { useDocumentTitle } from "@mantine/hooks";
import { useDroneWebSocket } from "../hooks/useDroneWebSocket";
import { Box } from "@mantine/core";
import { MapboxMapContainer } from "../components/map-page/MapboxMapContainer";
import { DronesPanel } from "../components/map-page/drones-panel/DronesPanel";

import "mapbox-gl/dist/mapbox-gl.css";
import NumberOfDronesDialog from "../components/map-page/drones-panel/NumberOfDronesDialog";

function MapPage() {
  useDocumentTitle("SAGER - Map");
  useDroneWebSocket();

  return (
    <Box flex={1}>
      <MapboxMapContainer />
      <DronesPanel />
      <NumberOfDronesDialog />
    </Box>
  );
}

export default MapPage;
