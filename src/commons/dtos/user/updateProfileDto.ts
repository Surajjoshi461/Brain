import { UpdateProfileRequest } from "src/types/request/userRequest";

export class UserProfileDto {
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly phoneNumber: string;
  readonly email: string;

  constructor(body: UpdateProfileRequest) {
    this.userId = body.userId;
    this.firstName = body.firstName;
    this.lastName = body.lastName;
    this.address = body.address;
    this.phoneNumber = body.phoneNumber;
    this.email = body.email;
  }
}
