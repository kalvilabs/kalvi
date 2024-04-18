import { RefObject } from "react";
import { GsiButtonConfiguration, TGoogleSignInFunction } from "../google-auth";

export {}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: { client_id: string | undefined; callback: ({ clientId, credential, }: TGoogleSignInFunction) => Promise<void> }) => void;
          renderButton: (element: HTMLDivElement, options: GsiButtonConfiguration) => void;
          prompt: () => void;
          cancel: () => void;
        };
      };
    };
  }
}
