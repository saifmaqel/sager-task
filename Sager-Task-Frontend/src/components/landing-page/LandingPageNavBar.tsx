import { NavLink } from "react-router-dom";
import { Flex, Text } from "@mantine/core";

import IconDashboard from "../../../../Sager-Task-Backend/Icon/dashboard-svgrepo-com-2.svg";
import IconLocation from "../../../../Sager-Task-Backend/Icon/location-svgrepo-com-2.svg";

const navItems = [
  { label: "DASHBOARD", to: "/dashboard", icon: IconDashboard },
  { label: "MAP", to: "/map", icon: IconLocation },
];

function LandingPageNavBar() {
  return (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            textDecoration: "none",
            backgroundColor: isActive ? "#242424ff" : "transparent",
            color: isActive ? "#fff" : "#ccc",
            fontWeight: isActive ? 600 : 400,
            borderLeft: isActive ? "4px solid red" : "4px solid gray",
          })}
        >
          <Flex direction="column" align="center" gap="4" p="md">
            <img src={item.icon} width={24} height={24} />
            <Text size="sm">{item.label}</Text>
          </Flex>
        </NavLink>
      ))}
    </>
  );
}

export default LandingPageNavBar;
