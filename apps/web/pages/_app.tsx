import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { DataProvider } from "@/hooks/useData";

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
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default App;
