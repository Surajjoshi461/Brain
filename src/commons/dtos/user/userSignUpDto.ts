import { SignUpRequest } from "src/types/request/userRequest";

export class UserSignUpDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  address: string;
  phoneNumber: string;
  constructor(userDetail: SignUpRequest) {
    this.email = userDetail.email;
    this.firstName = userDetail.firstName;
    this.lastName = userDetail.lastName;
    this.password = userDetail.password;
    this.address = userDetail.address;
    this.phoneNumber = userDetail.phoneNumber;
  }
}
