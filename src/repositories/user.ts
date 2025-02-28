import { UserSignUpDto } from "../commons/dtos/userSignUpDto";
import userModel from "../model/user";
import { UserType } from "../types/api/userType";

export class UserRepository {
  public async findUser(email: string) {
    return await userModel.findOne({ email: email }).lean();
  }

  public async createUser(user: UserType) {
    await userModel.create(user);
  }
}
