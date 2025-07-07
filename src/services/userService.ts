import HttpStatus from "http-status-codes";

import { UserLogInDto } from "../commons/dtos/user/userLogInDto";
import UserConverter from "../commons/converters/userConverter";
import { UserSignUpDto } from "../commons/dtos/user/userSignUpDto";
import { UserRepository } from "../repositories/userRepository";
import AuthTokenVerification from "../utils/authTokenVerification";
import PasswordUtil from "../utils/passwordUtil";
import { UserProfileDto } from "src/commons/dtos/user/updateProfileDto";
import {
  GetProfileResponse,
  LogInResponse,
  ResetPasswordResponse,
  UpdateProfileResponse,
} from "src/types/response/user/userResponse";
import { ResetPasswordDto } from "src/commons/dtos/user/resetPasswordDto";
import { ExpressError } from "src/commons/helper/errorHandler/expressError";
import constant from "src/commons/constant";

export class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(userDto: UserSignUpDto) {
    const isUserExist = await this.userRepository.findUser(userDto.email);
    if (isUserExist) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.INVALID_EMAIL
      );
    }
    //TODO : 25/02/2025 - add mail service to send varification mail
    const userDetail = await UserConverter.toSignUpResponse(userDto);
    await this.userRepository.createUser(userDetail);
    return { success: true };
  }

  public async userLogIn(userDto: UserLogInDto): Promise<LogInResponse> {
    const isUserExist = await this.userRepository.findUser(userDto.email);
    if (!isUserExist) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.USER_NOT_FOUND
      );
    }
    const isPasswordExist = await PasswordUtil.varifying(
      userDto.password,
      isUserExist.password
    );
    if (!isPasswordExist) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.INCORRECT_PASSWORD
      );
    }
    const userToken = await AuthTokenVerification.setUser(userDto);
    return {
      userId: isUserExist._id.toString(),
      token: userToken,
      firstName: isUserExist.firstName,
      lastName: isUserExist.lastName,
      email: isUserExist.email,
      phoneNumber: isUserExist.phoneNumber,
      address: isUserExist.address,
      profilePic: isUserExist?.profilePic,
    };
  }

  public async updateUserProfile(
    profileDto: UserProfileDto
  ): Promise<UpdateProfileResponse> {
    const updatedProfile = await this.userRepository.updateUserProfile(
      profileDto
    );

    if (!updatedProfile) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.USER_NOT_FOUND
      );
    }

    const {
      _id: userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    } = updatedProfile;

    return {
      userId: userId.toString(),
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    };
  }

  public async getUserProfile(userId: string): Promise<GetProfileResponse> {
    const profileDetail = await this.userRepository.findById(userId);
    if (!profileDetail) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.USER_NOT_FOUND
      );
    }
    const { firstName, lastName, email, phoneNumber, address } = profileDetail;
    return {
      userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    };
  }

  public async resetPassword(
    userDto: ResetPasswordDto
  ): Promise<ResetPasswordResponse> {
    const isUserExist = await this.userRepository.findById(userDto.userId);
    if (!isUserExist) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.USER_NOT_FOUND
      );
    }
    if (!isUserExist.isActive) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.INACTIVE_USER
      );
    }
    const isPasswordExist = await PasswordUtil.varifying(
      userDto.oldPassword,
      isUserExist.password
    );
    if (!isPasswordExist) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.INCORRECT_PASSWORD
      );
    }
    const newPassword = await PasswordUtil.hashing(userDto.newPassword);
    await this.userRepository.resetPassword(userDto.userId, newPassword);
    return {
      success: true,
    };
  }
}
