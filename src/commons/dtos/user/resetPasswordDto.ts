import { ResetPasswordRequest } from "src/types/request/userRequest";

export class ResetPasswordDto {
  userId: string;
  oldPassword: string;
  newPassword: string;

  constructor(userDetail: ResetPasswordRequest) {
    this.userId = userDetail.userId;
    this.oldPassword = userDetail.oldPassword;
    this.newPassword = userDetail.newPassword;
  }
}
