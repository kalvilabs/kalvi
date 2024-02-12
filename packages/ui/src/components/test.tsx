import { Title, Text, Anchor } from "@mantine/core";

export default function MantineText() {
  return (
    <Title ta="center" mt={100}>
      Welcome to{" "}
      <Text
        inherit
        variant="gradient"
        component="span"
        gradient={{ from: "pink", to: "yellow" }}
      >
        Mantine
      </Text>
    </Title>
  );
}
