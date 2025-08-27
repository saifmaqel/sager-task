import { Card, Text, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface DashboardInfoCardProps {
  label: string;
  value: number;
  color?: string;
}

export default function DashboardInfoCard({
  label,
  value,
  color,
}: DashboardInfoCardProps) {
  const theme = useMantineTheme();

  const isXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const isSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const padding = isXs ? "xs" : isSm ? "sm" : "md";
  const labelSize = isXs ? "xs" : isSm ? "sm" : "md";
  const valueSize = isXs ? 5 : isSm ? 4 : 3;

  return (
    <Card shadow="sm" padding={padding} radius="md">
      <Text c={color} fz={labelSize} mb="xs">
        {label}
      </Text>
      <Title order={valueSize} mt={"auto"}>
        {value}
      </Title>
    </Card>
  );
}
