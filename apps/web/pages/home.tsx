import type { NextPage } from "next";
import { Text } from "@mantine/core";
import Layout from "@/components/layout/Layout";
import { useData } from "@/hooks/useData";

const HomePage: NextPage = () => {
  const { user } = useData();

  return (
    <Layout>
      <Text
        align="center"
        sx={{
          color: "#FFF",
          fontSize: 80,
          paddingTop: 20,
          paddingBottom: 20,
          fontWeight: 700,
        }}
      >
        You are {user === null && "not "}logged in! {user?.email}
      </Text>
    </Layout>
  );
};

export default HomePage;
