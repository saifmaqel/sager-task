import { Dialog, Text, useMantineTheme } from "@mantine/core";
import { DroneTabs } from "./DroneTabs";
import { useMediaQuery } from "@mantine/hooks";
import { HEADER_HEIGHT, NAVBAR_WIDTH } from "../../../routes/LandingPage";

export function DronesPanel() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Dialog
      opened
      withCloseButton
      shadow="md"
      radius="md"
      p="0"
      size="lg"
      w={isMobile ? "50vw" : isTablet ? "40vw" : "30vw"}
      h={`calc(100vh - ${HEADER_HEIGHT + 20}px)`}
      position={{
        top: HEADER_HEIGHT + 10,
        left: isMobile || isTablet ? 10 : NAVBAR_WIDTH + 10,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text fw={700} size="lg" p="md" style={{ flexShrink: 0 }}>
        DRONE FLYING
      </Text>
      <DroneTabs />
    </Dialog>
  );
}
