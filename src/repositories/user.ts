import userModel from "../model/userModel";
import { UserType } from "../types/api/userType";

export class UserRepository {
  public async findUser(email: string) {
    return await userModel.findOne({ email: email }).lean();
  }

  public async createUser(user: UserType) {
    await userModel.create(user);
  }
}
