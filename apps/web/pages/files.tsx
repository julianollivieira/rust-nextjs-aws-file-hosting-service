import type { NextPage } from "next";
import { Text } from "@mantine/core";
import AppLayout from "@/components/layout/AppLayout";

const FilesPage: NextPage = () => {
  return (
    <AppLayout>
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
        Files
      </Text>
    </AppLayout>
  );
};

export default FilesPage;
