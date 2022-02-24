import { Container, Box } from "@mantine/core";
import { ReactElement, ReactNode } from "react";
import NavigationBar from "@/components/navigation/NavigationBar";

type Props = { children: ReactNode };

const Layout = ({ children }: Props): ReactElement => {
  return (
    <>
      <NavigationBar />
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.blue[5],
          paddingBottom: 20,
        })}
      >
        <Container size="xl">{children}</Container>
      </Box>
    </>
  );
};

export default Layout;
