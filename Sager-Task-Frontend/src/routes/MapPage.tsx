import { useDocumentTitle } from "@mantine/hooks";
import { Box } from "@mantine/core";
import { MapboxMapContainer } from "../components/map-page/MapboxMapContainer";
import { DronesPanel } from "../components/map-page/drones-panel/DronesPanel";

import "mapbox-gl/dist/mapbox-gl.css";
import NumberOfDronesDialog from "../components/map-page/drones-panel/NumberOfDronesDialog";

function MapPage() {
  useDocumentTitle("SAGER - Map");

  return (
    <Box flex={1}>
      <MapboxMapContainer />
      <DronesPanel />
      <NumberOfDronesDialog />
    </Box>
  );
}

export default MapPage;
