import { Card, Flex, Title, Box, useMantineTheme } from "@mantine/core";
import DroneInfo from "./DroneInfo";
import type { Feature, LineString } from "geojson";
import { getStatusColor } from "../../../utils/mapUtils";
import { useHover, useMediaQuery } from "@mantine/hooks";
import type { DroneFeatureProperties } from "../../../types/mapTypes";
import { useMapboxMapContext } from "../../../context/mapboxContext";

interface DroneCardProps {
  drone: Feature<LineString, DroneFeatureProperties>;
  isCLicked: boolean | null;
}

export function DroneCard({ drone, isCLicked }: DroneCardProps) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const { map } = useMapboxMapContext();
  const { hovered, ref } = useHover();

  return (
    <Card
      ref={ref}
      shadow="sm"
      radius={0}
      bg={isCLicked ? "#3f3f3f" : hovered ? "#1f1f1f" : "#141517"}
      style={{
        border: ".5px solid black",
        borderLeft: "none",
        borderRight: "none",
        cursor: "pointer",
        transition: "background-color 0.5s ease",
      }}
      onClick={() => {
        const lastVertex =
          drone.geometry.coordinates[drone.geometry.coordinates.length - 1];
        map?.flyTo({ center: [lastVertex[0], lastVertex[1]], zoom: 14 });
      }}
      p={{ base: "sm", sm: "md" }}
    >
      <Flex
        direction="column"
        gap="xs"
        justify="center"
        align={isMobile ? "center" : ""}
      >
        <Title order={5}>{drone.properties?.Name}</Title>

        <Flex
          py={{ base: "xs", sm: "md" }}
          align="center"
          direction={{ base: "column", xs: "row" }}
          gap={{ base: "sm", xs: "md" }}
        >
          <Flex direction="column" flex={1} gap="6">
            <DroneInfo
              infoKey="Serial #"
              infoValue={drone.properties?.serial ?? "Invalid"}
            />
            <DroneInfo
              infoKey="Pilot"
              infoValue={drone.properties?.pilot ?? "Invalid"}
            />
          </Flex>

          <Flex direction="column" flex={1} gap="6">
            <DroneInfo
              infoKey="Registration #"
              infoValue={drone.properties?.registration ?? "Invalid"}
            />
            <DroneInfo
              infoKey="Organization"
              infoValue={drone.properties?.organization ?? "Invalid"}
            />
          </Flex>

          <Box
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: getStatusColor(
                drone.properties?.registration ?? "Invalid"
              ),
              border: "1px solid white",
            }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
