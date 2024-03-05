import { GithubAuthIcon, GoogleAuthIcon } from "../../icons";
import { Button, ButtonProps } from "../../partials/button";

interface TAuthProviderButtonProps extends ButtonProps {
  provider: "google" | "github";
}

interface ButtonData {
  icon: React.ReactNode;
  text: string;
}

export const AuthProviderButton = ({
  provider,
  ...props
}: TAuthProviderButtonProps) => {
  let buttonData: ButtonData;

  switch (provider) {
    case "google":
      buttonData = {
        icon: <GoogleAuthIcon className="h-5 w-5"/>,
        text: "Google",
      };
      break;
    case "github":
      buttonData = {
        icon: <GithubAuthIcon className="h-5 w-5"/>,
        text: "GitHub",
      };
      break;
  }

  return (
    <Button variant="provider" {...props}>
      {buttonData.icon}
      {buttonData.text}
    </Button>
  );
};
