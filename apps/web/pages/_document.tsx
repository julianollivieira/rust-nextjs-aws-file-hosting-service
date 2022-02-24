import { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";
import type { NextPage } from "next";

const Document: NextPage = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

Document.getInitialProps = createGetInitialProps();

export default Document;
