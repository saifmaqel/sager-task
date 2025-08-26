import { Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";

function Dashboard() {
  useDocumentTitle("SAGER - Map");

  return (
    <>
      <Title>Dashboard Page</Title>
    </>
  );
}

export default Dashboard;
