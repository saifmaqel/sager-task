import { SimpleGrid } from "@mantine/core";
import DashboardInfoCard from "./DashboardInfoCard";
import { useDroneStore } from "../../stores/droneStors";

function DashboardInfoCards() {
  const drones = useDroneStore((state) => state.drones);

  return (
    <SimpleGrid
      cols={3}
      spacing={{ base: 10, sm: "xl" }}
      verticalSpacing={{ base: "md", sm: "xl" }}
    >
      <DashboardInfoCard label="Total Drones" value={drones.length} />
      <DashboardInfoCard
        label="Allowed To Fly Drones"
        value={
          drones.filter((d) => d.properties.statusColor === "green").length
        }
        color="green"
      />
      <DashboardInfoCard
        label="NOT Allowed To Fly Drones"
        value={
          drones.filter((d) => d.properties.statusColor !== "green").length
        }
        color="red"
      />
    </SimpleGrid>
  );
}

export default DashboardInfoCards;
