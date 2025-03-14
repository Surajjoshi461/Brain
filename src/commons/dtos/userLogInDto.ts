import { LogInRequest } from '../../types/request/user/logInRequest'

export class UserLogInDto {
  email: string;
  password: string;

  constructor(userDetail: LogInRequest) {
    this.email = userDetail.email;
    this.password = userDetail.password;
  }
}