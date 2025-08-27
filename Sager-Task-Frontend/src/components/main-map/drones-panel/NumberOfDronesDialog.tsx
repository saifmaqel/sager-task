import { Dialog, Flex, Badge, Text, useMantineTheme } from "@mantine/core";
import { useDroneStore } from "../../../stores/droneStors";
import { getStatusColor } from "../../../utils/mapUtils";
import { useMediaQuery } from "@mantine/hooks";

function NumberOfDronesDialog() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const drones = useDroneStore((state) => state.drones);

  const dronesAllowedToFly = drones.filter(
    (drone) => getStatusColor(drone.properties.registration) === "red"
  ).length;

  return (
    <Dialog
      opened={true}
      withCloseButton={false}
      shadow="md"
      radius="md"
      p={0}
      position={{
        bottom: 20,
        right: 20,
      }}
      style={{
        backgroundColor: "#eeeeee",
        width: "min(35vw, 150px)",
        height: "min(10vh, 50px)",
      }}
    >
      <Flex
        direction={isMobile ? "column" : "row"}
        justify="center"
        align="center"
        gap={isMobile ? "0" : "xs"}
        style={{ height: "100%", whiteSpace: "nowrap" }}
      >
        <Badge color="#25262B" size={isMobile ? "xs" : "md"}>
          {dronesAllowedToFly}
        </Badge>
        <Text c="black" size={isMobile ? "xs" : "sm"}>
          Drone Flying
        </Text>
      </Flex>
    </Dialog>
  );
}

export default NumberOfDronesDialog;
