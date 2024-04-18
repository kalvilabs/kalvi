"use client";

import { useEffect, useState, FC } from "react";
import { AuthProviderButton } from "@repo/ui/components";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authCookieSetter } from "@/actions";
import axios from "axios";
import { GITHUB_SIGN_IN_URL } from "@/api-routes";

type Props = {};

export const GitHubSignInButton: FC<Props> = () => {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const handleGitHubSignIn = async (credential: string) => {
    try {
      if (clientId && credential) {
        const response = await axios.post(GITHUB_SIGN_IN_URL, {
          code: credential,
        });

        authCookieSetter({
          access: response.data.tokens.access,
          refresh: response.data.tokens.refresh,
        });
      } else throw Error("Cant find credentials");
    } catch (err: any) {
      // TODO: Handle error
    }
  };
  const searchParams = useSearchParams();
  // states
  const [loginCallBackURL, setLoginCallBackURL] = useState<string>();
  const [gitCode, setGitCode] = useState<null | string>(null);

  const code = searchParams.get("code");
  useEffect(() => {
    if (code && !gitCode) {
      setGitCode(code);
      handleGitHubSignIn(code);
    }
  }, [code, gitCode, handleGitHubSignIn]);

  useEffect(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    setLoginCallBackURL(`${origin}/`);
  }, []);

  return (
    <Link
      passHref
      legacyBehavior
      href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${`${loginCallBackURL}/home/login`}&scope=read:user,user:email`}
    >
      <AuthProviderButton
        provider="github"
        width="full"
        columnSpan={2}
        textSize="sm"
      />
    </Link>
  );
};
