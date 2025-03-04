import PasswordUtil from "../../utils/passwordUtil";
import { UserType } from "../../types/api/userType";
import constant from "../constant";
import { UserSignUpDto } from "../dtos/userSignUpDto";

export default class UserConverter {
  public static async toSignUpResponse(userDto: UserSignUpDto): Promise<UserType> {
    return {
      userId: constant.GENERATE_UUID(),
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      password: await PasswordUtil.hashing(userDto.password),
      emailVerified: false,
    };
  }
}
