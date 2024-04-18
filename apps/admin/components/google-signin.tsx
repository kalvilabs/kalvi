"use client";

import { FC, useEffect, useRef, useCallback, useState } from "react";
import Script from "next/script";
import axios, { AxiosError } from "axios";
import { GOOGLE_SIGN_IN_URL } from "@/api-routes";
import {
  TGoogleSignInFunction,
  TGoogleSignInErrorResponse,
  TGoogleSignInSuccessResponse,
} from "@/types";
import { authCookieSetter } from "@/actions";
import { useRouter } from "next/navigation";

export const GoogleSignInButton: FC = () => {
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const handleGoogleSignIn = async ({
    clientId,
    credential,
  }: TGoogleSignInFunction) => {
    if (!clientId || !credential) {
      throw Error("Cant find credentials");
    }
    try {
      const response = await axios.post<TGoogleSignInSuccessResponse>(
        GOOGLE_SIGN_IN_URL,
        {
          auth_token: credential,
        }
      );
      authCookieSetter({
        access: response.data.tokens.access,
        refresh: response.data.tokens.refresh,
      });
      router.push("/admin/dashboard");
    } catch (err) {
      const error = err as AxiosError<TGoogleSignInErrorResponse>;
      // TODO: Handle error
    }
  };

  // refs
  const googleSignInButton = useRef<HTMLDivElement>(null);
  // states
  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);

  const loadScript = useCallback(() => {
    if (!googleSignInButton.current || gsiScriptLoaded) return;
    console.log(process.env.GOOGLE_CLIENT_ID!);

    // Assign googleId the value of window.google.accounts.id
    const googleId = window?.google?.accounts.id;

    if (!googleId) {
      console.error("Google Sign-In library not loaded");
      return;
    }

    googleId.initialize({
      client_id: clientId,
      callback: handleGoogleSignIn,
    });

    try {
      googleId.renderButton(
        googleSignInButton.current,
        {
          type: "standard",
          theme: "outline",
          size: "large",
          logo_alignment: "center",
          text: "signin_with",
        } // customization attributes
      );
    } catch (err) {
      // TODO: Handle error
    }

    googleId.prompt(); // also display the One Tap dialog

    setGsiScriptLoaded(true);
  }, [handleGoogleSignIn, gsiScriptLoaded, clientId]);

  useEffect(() => {
    const googleId = window?.google?.accounts.id;
    if (googleId) {
      loadScript();
    }
    return () => {
      googleId.cancel();
    };
  }, [loadScript]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={loadScript}
      />
      <div
        className="w-full rounded"
        id="googleSignInButton"
        ref={googleSignInButton}
      />
    </>
  );
};
