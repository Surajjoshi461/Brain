import { UserLogInDto } from "../commons/dtos/userLogInDto";
import UserConverter from "../commons/converters/userConverter";
import { UserSignUpDto } from "../commons/dtos/userSignUpDto";
import { UserRepository } from "../repositories/user";
import AuthTokenVerification from "../utils/authTokenVerification";
import PasswordUtil from "../utils/passwordUtil"
import { LogInResponse } from "../types/response/user/logInResponse";

export class UserService {
  private _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async createUser(userDto: UserSignUpDto) {
    try {
      const isUserExist = await this._userRepository.findUser(userDto.email);
      if (isUserExist) {
        console.log("Email already exist");
        throw new Error("Email already exist");
      }
      //TODO : 25/02/2025 - add mail service to send varification mail
      const userDetail = await UserConverter.toSignUpResponse(userDto);
      await this._userRepository.createUser(userDetail);
      return { success: true };
    } catch (error) {
      console.log("Error in #UserService/signUpMethod");
      throw error;
    }
  }

  public async userLogIn(userDto: UserLogInDto): Promise<LogInResponse> {
    const isUserExist = await this._userRepository.findUser(userDto.email)
    if (!isUserExist) {
      console.log("User not exist");
      throw new Error("User not exist");
    }
    const isPasswordExist = await PasswordUtil.varifying(userDto.password, isUserExist.password)
    if (!isPasswordExist) {
      console.log("Password is Invalid")
      throw new Error("Password is Invalid")
    }
    const userToken = await AuthTokenVerification.setUser(userDto);
    return { userId: isUserExist.userId, token: userToken }
  }
}
