export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
};

export type LogInRequest = {
  email: string;
  password: string;
};

export type UpdateProfileRequest = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export type GetUserParams = {
  userId: string;
};

export type ResetPasswordRequest = {
  userId: string;
  oldPassword: string;
  newPassword: string;
};
