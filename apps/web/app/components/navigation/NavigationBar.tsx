import { ReactElement } from "react";
import {
  Header,
  Container,
  Box,
  MediaQuery,
  Burger,
  Button,
  Menu,
  Text,
} from "@mantine/core";
import Link from "@/components/Link";
import { LogoutIcon, UserCircleIcon, UserIcon } from "@heroicons/react/outline";
import Router from "next/router";

type Props = {};

const NavigationBar = ({}: Props): ReactElement => {
  const user = null;
  const open = false;

  return (
    <Header
      height={60}
      padding="xs"
      sx={{ border: "none", display: "flex", alignItems: "center" }}
    >
      <Container
        size="xl"
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>Logo</Box>
        <Box sx={{ display: "flex" }}>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginRight: 20 }}>
                <Link
                  href="/"
                  buttonProps={{
                    variant: "white",
                    color: "blue",
                    sx: (theme) => ({
                      "&:hover": {
                        color: theme.colors.blue[4],
                      },
                    }),
                  }}
                >
                  Home
                </Link>
                <Link
                  href="/contact"
                  buttonProps={{
                    variant: "white",
                    color: "blue",
                    sx: (theme) => ({
                      "&:hover": {
                        color: theme.colors.blue[4],
                      },
                    }),
                  }}
                >
                  Contact
                </Link>
              </Box>
              <Box sx={{ display: "flex" }}>
                {user ? (
                  <Menu
                    control={
                      <Button
                        variant="white"
                        color="blue"
                        sx={(theme) => ({
                          paddingLeft: 5,
                          paddingRight: 5,
                          "&:hover": {
                            color: theme.colors.blue[4],
                          },
                        })}
                      >
                        <UserIcon style={{ width: 20 }} />
                      </Button>
                    }
                  >
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item
                      color="blue"
                      icon={<UserCircleIcon style={{ width: 20 }} />}
                      onClick={() => Router.push("/account")}
                    >
                      <Text size="sm">Account</Text>
                    </Menu.Item>
                    <Menu.Item
                      color="blue"
                      icon={<LogoutIcon style={{ width: 20 }} />}
                      onClick={async () => {
                        Router.push("/sign-in");
                      }}
                    >
                      <Text size="sm">Log out</Text>
                    </Menu.Item>
                  </Menu>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      buttonProps={{
                        variant: "light",
                        color: "blue",
                        sx: {
                          marginLeft: 10,
                          marginRight: 10,
                        },
                      }}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/create-account"
                      buttonProps={{ color: "blue" }}
                    >
                      Create an account
                    </Link>
                  </>
                )}
              </Box>
            </Box>
          </MediaQuery>
          <Box>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={open}
                aria-label={`${open ? "Close" : "Open"} navigation`}
              />
            </MediaQuery>
          </Box>
        </Box>
      </Container>
    </Header>
  );
};

export default NavigationBar;
