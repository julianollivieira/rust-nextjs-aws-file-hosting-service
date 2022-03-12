import { AppShell, Navbar, Header } from "@mantine/core";
import { ReactElement, ReactNode } from "react";

type Props = { children: ReactNode };

const AppLayout = ({ children }: Props): ReactElement => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} padding="xs">
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header height={60} padding="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
    </AppShell>
  );
};

export default AppLayout;
