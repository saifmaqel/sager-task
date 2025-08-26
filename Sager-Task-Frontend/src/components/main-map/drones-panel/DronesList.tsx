import { ScrollArea } from "@mantine/core";
import { DroneCard } from "./DroneCard";
import { useDroneStore } from "../../../stores/droneStors";

export function DroneList() {
  const drones = useDroneStore((state) => state.drones);

  return (
    <ScrollArea style={{ flex: 1 }}>
      {drones.map((drone) => (
        <DroneCard key={drone.properties?.serial} drone={drone} />
      ))}
    </ScrollArea>
  );
}
