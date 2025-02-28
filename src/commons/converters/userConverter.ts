import { UserType } from "../../types/api/userType";
import constant from "../constant";
import { UserSignUpDto } from "../dtos/userSignUpDto";

export default class UserConverter {
  public static toSignUpResponse(userDto: UserSignUpDto): UserType {
    return {
      userId: constant.GENERATE_UUID(),
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      password: userDto.password,
      emailVerified: false,
    };
  }
}
