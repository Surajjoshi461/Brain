import { UserProfileDto } from "src/commons/dtos/user/updateProfileDto";
import userModel from "../model/userModel";
import { UserType } from "../types/api/userType";

export class UserRepository {
  public async findUser(email: string) {
    return await userModel.findOne({ email: email, isActive: true }).lean();
  }

  public async findUserByUserId(userId: string) {
    return await userModel.findOne({ _id: userId, isActive: true }).lean();
  }

  public async createUser(user: UserType) {
    await userModel.create(user);
  }

  public async findById(userId: string) {
    return await userModel.findById(userId).lean();
  }

  public async updateUserProfile(profileDto: UserProfileDto) {
    const { userId, firstName, lastName, email, address, phoneNumber } =
      profileDto;
    return await userModel
      .findOneAndUpdate(
        { _id: userId },
        { firstName, lastName, email, address, phoneNumber },
        { new: true }
      )
      .lean();
  }

  public async resetPassword(userId: string, newPassword: string) {
    await userModel.updateOne(
      { _id: userId },
      { $set: { password: newPassword } }
    );
  }
}
