import PasswordUtil from "../../utils/passwordUtil";
import { UserType } from "../../types/api/userType";
import constant from "../constant";
import { UserSignUpDto } from "../dtos/user/userSignUpDto";

export default class UserConverter {
  public static async toSignUpResponse(
    userDto: UserSignUpDto
  ): Promise<UserType> {
    return {
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      password: await PasswordUtil.hashing(userDto.password),
      address: userDto.address,
      phoneNumber: userDto.phoneNumber,
      profilePic:
        "https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740",
      emailVerified: false,
      isActive: true,
    };
  }
}
