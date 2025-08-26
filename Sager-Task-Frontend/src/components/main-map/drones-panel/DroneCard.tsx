import { Card, Flex, Title, Box } from "@mantine/core";
import DroneInfo from "./DroneInfo";
import type { Feature } from "geojson";
import { getStatusColor } from "../../../utils/droneUtils";

interface DroneCardProps {
  drone: Feature;
}

export function DroneCard({ drone }: DroneCardProps) {
  return (
    <Card
      shadow="sm"
      radius={0}
      bg="#141517"
      style={{
        border: ".5px solid black",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "2px solid black",
        borderBottom: "2px solid black",
      }}
    >
      <Flex direction="column">
        <Title order={5}>{drone.properties?.Name}</Title>
        <Flex py="md" align="center">
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
