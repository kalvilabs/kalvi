import { BASE_URL } from "./base-url";

export const LOGIN_URL = BASE_URL + "sign-in/";
export const LOGOUT_URL = BASE_URL + "sign-out/";
export const REGISTER_URL = BASE_URL + "sign-up/";
export const FORGOT_PASSWORD_URL = BASE_URL + "send-reset-password-email/";
export const RESET_PASSWORD_URL = (uid: string, token: string) =>
  BASE_URL + "reset-password/" + uid + "/" + token + "/";
export const GOOGLE_SIGN_IN_URL = BASE_URL + "google/";
export const GITHUB_SIGN_IN_URL = BASE_URL + "github/";
