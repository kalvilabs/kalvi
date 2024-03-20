export type TLoginSuccessResponse = {
  token: {
    access: string;
    refresh: string;
  };
  message: string;
};

export type TLoginErrorResponse = {
  errors: string;
};
