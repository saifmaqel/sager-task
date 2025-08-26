import { Button, Center, Text } from "@mantine/core";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <Center
      style={{ height: "100vh", flexDirection: "column", textAlign: "center" }}
    >
      <Text c="red" fw={700} mb="md">
        Something went wrong:
      </Text>
      <Text mb="md">{error.message}</Text>
      <Button onClick={resetErrorBoundary}>Try Again</Button>
    </Center>
  );
}
export default ErrorFallback;
