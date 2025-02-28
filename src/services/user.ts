import UserConverter from "../commons/converters/userConverter";
import { UserSignUpDto } from "../commons/dtos/userSignUpDto";
import { UserRepository } from "../repositories/user";

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
      const userDetail = UserConverter.toSignUpResponse(userDto);
      await this._userRepository.createUser(userDetail);
      return { success: true };
    } catch (error) {
      console.log("Error in #UserService/signUpMethod");
      throw error;
    }
  }

  public async userLogIn(userDto: loginsto)
}
