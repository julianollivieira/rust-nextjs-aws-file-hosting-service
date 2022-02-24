import type { NextPage } from "next";
import { Text } from "@mantine/core";
import Layout from "@/components/layout/Layout";

const SignInPage: NextPage = () => {
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
        Test page
      </Text>
    </Layout>
  );
};

export default SignInPage;
