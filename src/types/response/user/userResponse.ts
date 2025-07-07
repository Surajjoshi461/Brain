export type LogInResponse = {
  userId: string;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePic: string;
};

export type SignUpResponse = {
  success: boolean;
};

export type UpdateProfileResponse = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export type GetProfileResponse = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export type ResetPasswordResponse = {
  success: boolean;
};
