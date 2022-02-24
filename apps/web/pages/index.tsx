import type { NextPage } from "next";
import { Text } from "@mantine/core";
import Layout from "@/components/layout/Layout";

const HomePage: NextPage = () => {
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
        Home
      </Text>
    </Layout>
  );
};

export default HomePage;
