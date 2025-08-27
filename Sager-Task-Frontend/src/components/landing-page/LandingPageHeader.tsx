import {
  Flex,
  Burger,
  Title,
  Group,
  ActionIcon,
  Divider,
  Text,
  useMantineTheme,
} from "@mantine/core";

import IconBell from "../../../../Sager-Task-Backend/Icon/bell.svg";
import IconCapture from "../../../../Sager-Task-Backend/Icon/capture-svgrepo-com.svg";
import IconLanguage from "../../../../Sager-Task-Backend/Icon/language-svgrepo-com.svg";

type LandingPageHeaderProps = {
  isNavOpened: boolean;
  toggleNav: () => void;
};

import { useMediaQuery } from "@mantine/hooks";

function LandingPageHeader({ isNavOpened, toggleNav }: LandingPageHeaderProps) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Flex
      justify="space-between"
      align="center"
      h="100%"
      px={{ base: "xs", sm: "md" }}
    >
      <Flex align="center" gap="sm">
        <Burger
          opened={isNavOpened}
          onClick={toggleNav}
          hiddenFrom="sm"
          size="sm"
        />
        <Title order={1} fs="italic" fw={700} size={isMobile ? "h3" : "h1"}>
          SAGER
        </Title>
      </Flex>

      <Flex gap="md" align="center">
        <Group>
          <ActionIcon variant="transparent" size={isMobile ? "sm" : "md"}>
            <img
              src={IconCapture}
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          </ActionIcon>
          <ActionIcon variant="transparent" size={isMobile ? "sm" : "md"}>
            <img
              src={IconLanguage}
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          </ActionIcon>
          <ActionIcon variant="transparent" size={isMobile ? "sm" : "md"}>
            <img
              src={IconBell}
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          </ActionIcon>
        </Group>

        <Divider orientation="vertical" visibleFrom="xs" />
        <Flex direction="column" visibleFrom="xs">
          <Text fw={500} size={isMobile ? "xs" : "sm"}>
            Hello, Mohammed Omar
          </Text>
          <Text size={isMobile ? "xs" : "xs"}>Technical Support</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default LandingPageHeader;
