import { Flex, Text } from "@mantine/core";

type DroneInfo = {
  infoKey: string;
  infoValue: string;
};

function DroneInfo({ infoKey, infoValue }: DroneInfo) {
  return (
    <Flex direction="column">
      <Text size="xs" fw="lighter">
        {infoKey}
      </Text>
      <Text size="xs" fw="600">
        {infoValue}
      </Text>
    </Flex>
  );
}

export default DroneInfo;
