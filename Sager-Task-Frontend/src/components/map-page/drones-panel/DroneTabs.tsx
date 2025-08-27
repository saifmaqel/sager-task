import { Tabs, Text } from "@mantine/core";
import { DroneList } from "./DronesList";

export function DroneTabs() {
  return (
    <Tabs
      defaultValue="drones"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Tabs.List grow style={{ flexShrink: 0 }}>
        <Tabs.Tab value="drones" color="red">
          Drones
        </Tabs.Tab>
        <Tabs.Tab value="history" color="red">
          Flights History
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel
        value="drones"
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
        p={{ base: "xs", sm: "md" }}
      >
        <DroneList />
      </Tabs.Panel>

      <Tabs.Panel value="history" pt="md">
        <Text>Flight history</Text>
      </Tabs.Panel>
    </Tabs>
  );
}
