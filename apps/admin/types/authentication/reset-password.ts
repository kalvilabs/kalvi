export interface TResetPasswordSuccessResponse {
  message: string;
}
export interface TResetPasswordErrorResponse {
  non_field_errors?: string[];
  password?: string[];
  confirm_password?: string[];
}