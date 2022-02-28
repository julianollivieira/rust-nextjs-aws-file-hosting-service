import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default App;
