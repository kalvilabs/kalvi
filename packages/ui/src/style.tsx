import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function MantineWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
