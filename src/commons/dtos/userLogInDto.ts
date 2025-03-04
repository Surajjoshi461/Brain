import { LogInRequest } from '../../types/request/user/logInRequest'
import constant from '../constant';

export class UserLogInDto {
  email: string;
  password: string;

  constructor(userDetail: LogInRequest) {
    this.email = userDetail.email;
    this.password = userDetail.password;
  }
}