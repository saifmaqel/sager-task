import { Container, Title, useMantineTheme } from "@mantine/core";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import DashboardInfoCards from "../components/dashboard-page/DashboardInfoCards";
import DashboardAgGrid from "../components/dashboard-page/DashboardAgGrid";

export default function DashboardDronesGrid() {
  useDocumentTitle("SAGER - Dashboard");

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <Container
      w="100%"
      h="100vh"
      py="md"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Title order={isMobile ? 5 : 2} mb="lg">
        Drones Dashboard
      </Title>
      <DashboardInfoCards />
      <DashboardAgGrid />
    </Container>
  );
}
