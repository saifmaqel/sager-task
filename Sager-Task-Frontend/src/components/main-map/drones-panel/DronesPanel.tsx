import { Dialog, Text } from "@mantine/core";
import { DroneTabs } from "./DroneTabs";
import { useMediaQuery } from "@mantine/hooks";
import { HEADER_HEIGHT, NAVBAR_WIDTH } from "../../../routes/LandingPage";

export function DronesPanel() {
  const isMobile = useMediaQuery("(max-width: 426px)");

  return (
    <Dialog
      opened={true}
      withCloseButton={true}
      size="lg"
      position={{
        top: HEADER_HEIGHT + 10,
        left: isMobile ? 10 : NAVBAR_WIDTH + 10,
      }}
      shadow="md"
      h={`calc(100vh - ${HEADER_HEIGHT}px)`}
      w="25vw"
      p="0"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Text fw={700} size="lg" p="md" style={{ flexShrink: 0 }}>
          DRONE FLYING
        </Text>
        <DroneTabs />
      </div>
    </Dialog>
  );
}
