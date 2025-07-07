import { LogInRequest } from "src/types/request/userRequest";

export class UserLogInDto {
  readonly email: string;
  readonly password: string;

  constructor(userDetail: LogInRequest) {
    this.email = userDetail.email?.toLowerCase() ?? "";
    this.password = userDetail.password;
  }
}
