import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type DroneInfo = {
  infoKey: string;
  infoValue: string;
};

function DroneInfo({ infoKey, infoValue }: DroneInfo) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <Flex direction="column">
      <Text size={isMobile ? "xs" : "sm"} fw="lighter">
        {infoKey}
      </Text>
      <Text size={isMobile ? "xs" : "sm"} fw="600">
        {infoValue}
      </Text>
    </Flex>
  );
}

export default DroneInfo;
