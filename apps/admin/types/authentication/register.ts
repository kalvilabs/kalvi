export type TRegistrationSuccessResponse = {
  token: {
    access: string;
    refresh: string;
  };
  message: string;
};

export type TRegistrationErrorResponse = {
  email?: string[];
  name?: string[];
  password?: string[];
  errors?: string;
};
