import { ScrollArea } from "@mantine/core";
import { DroneCard } from "./DroneCard";
import { useDroneStore } from "../../../stores/droneStors";
import { useClickedFeatureOnTheMapStore } from "../../../stores/clickedFeatureOnTheMapStore";
import type { DroneFeatureProperties } from "../../../types/mapTypes";

export function DroneList() {
  const drones = useDroneStore((state) => state.drones);
  const clickedFeature = useClickedFeatureOnTheMapStore(
    (state) => state.clickedFeature
  );

  return (
    <ScrollArea style={{ flex: 1 }} type="always">
      {drones.map((drone) => (
        <DroneCard
          key={drone.properties?.registration}
          drone={drone}
          isCLicked={
            clickedFeature &&
            (clickedFeature.properties as DroneFeatureProperties)
              ?.registration === drone.properties?.registration
          }
        />
      ))}
    </ScrollArea>
  );
}
