import NextLink from "next/link";
import { Button, ButtonProps } from "@mantine/core";
import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  buttonProps: ButtonProps<"a">;
};

const Link = ({ children, href, buttonProps }: Props): ReactElement => {
  return (
    <NextLink href={href} passHref>
      <Button component="a" {...buttonProps}>
        {children}
      </Button>
    </NextLink>
  );
};

export default Link;
