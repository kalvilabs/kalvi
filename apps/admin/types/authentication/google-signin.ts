export interface TGoogleSignInSuccessResponse {
  name: string;
  email: string;
  tokens: {
    access: string;
    refresh: string;
  };
}
export interface TGoogleSignInErrorResponse {
  errors: {
    auth_token: string[];
  };
}
