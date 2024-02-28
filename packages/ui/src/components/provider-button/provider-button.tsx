import { CustomGithubIcon, CustomGoogleIcon } from "../../../src/icons";
import { Button, ButtonProps } from "../../../src/partials/button";

export const ProviderButton = ({
  provider,
  ...props
}: {
  provider: "google" | "github";
} & ButtonProps) => {
  return (
    <Button variant="provider" {...props}>
      {provider === "google" ? (
        <CustomGoogleIcon isProviderButton />
      ) : (
        <CustomGithubIcon isProviderButton />
      )}
      {provider === "google" ? "Google" : "GitHub"}
    </Button>
  );
};
