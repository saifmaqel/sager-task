import {
  Flex,
  Burger,
  Title,
  Group,
  ActionIcon,
  Divider,
  Text,
} from "@mantine/core";

import IconBell from "../../../../Sager-Task-Backend/Icon/bell.svg";
import IconCapture from "../../../../Sager-Task-Backend/Icon/capture-svgrepo-com.svg";
import IconLanguage from "../../../../Sager-Task-Backend/Icon/language-svgrepo-com.svg";

type LandingPageHeaderProps = {
  isNavOpened: boolean;
  toggleNav: () => void;
};

function LandingPageHeader({ isNavOpened, toggleNav }: LandingPageHeaderProps) {
  return (
    <Flex justify="space-between" align="center">
      <Flex align="center" gap="sm">
        <Burger
          opened={isNavOpened}
          onClick={toggleNav}
          hiddenFrom="sm"
          size="sm"
        />
        <Title order={1} fs="italic" fw={700}>
          SAGER
        </Title>
      </Flex>

      <Flex gap="md" align="center">
        <Group>
          <ActionIcon variant="transparent">
            <img src={IconCapture} width={24} height={24} />
          </ActionIcon>
          <ActionIcon variant="transparent">
            <img src={IconLanguage} width={24} height={24} />
          </ActionIcon>
          <ActionIcon variant="transparent">
            <img src={IconBell} width={24} height={24} />
          </ActionIcon>
        </Group>
        <Divider orientation="vertical" />
        <Flex direction="column">
          <Text fw={500}>Hello, Mohammed Omar</Text>
          <Text size="xs">Technical Support</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LandingPageHeader;
