import { AppShell, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

import LandingPageHeader from "../components/landing-page/LandingPageHeader";
import LandingPageNavBar from "../components/landing-page/LandingPageNavBar";
import { useDroneWebSocket } from "../hooks/useDroneWebSocket";

export const HEADER_HEIGHT = 70;
export const NAVBAR_WIDTH = 120;

export default function LandingPage() {
  const [opened, { toggle }] = useDisclosure();

  // Called useDroneWebSocket custom hook here to update the drones list even when the user in the dashboard page
  useDroneWebSocket();

  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
      navbar={{
        width: NAVBAR_WIDTH,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      styles={{
        main: {
          overflow: "auto",
          width: "100%",
          height: "100%",
        },
      }}
      h="100%"
      w="100%"
    >
      <AppShell.Header p={{ base: "xs", sm: "md" }}>
        <LandingPageHeader isNavOpened={opened} toggleNav={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <LandingPageNavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Flex
          direction="column"
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
