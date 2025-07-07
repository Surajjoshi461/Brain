import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

import constant from "src/commons/constant";
import { UserLogInDto } from "src/commons/dtos/user/userLogInDto";
import { UserProfileDto } from "src/commons/dtos/user/updateProfileDto";
import { UserSignUpDto } from "src/commons/dtos/user/userSignUpDto";
import { UserService } from "src/services/userService";
import {
  SignUpRequest,
  LogInRequest,
  UpdateProfileRequest,
  GetUserParams,
  ResetPasswordRequest,
} from "src/types/request/userRequest";
import {
  SignUpResponse,
  LogInResponse,
  UpdateProfileResponse,
  GetProfileResponse,
  ResetPasswordResponse,
} from "src/types/response/user/userResponse";
import { GetProfileDto } from "src/commons/dtos/user/getProfileDto";
import { ResetPasswordDto } from "src/commons/dtos/user/resetPasswordDto";
import { ExpressError } from "src/commons/helper/errorHandler/expressError";
import {
  APIResponse,
  EmptyObject,
} from "src/commons/helper/apiResponse/apiResponse";
import CustomRequest from "src/commons/helper/customerRequest/CustomRequest";

export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async createUser(
    req: CustomRequest<EmptyObject, SignUpResponse, SignUpRequest>,
    res: Response<APIResponse<SignUpResponse>>,
    next: NextFunction
  ) {
    const userDto = new UserSignUpDto(req.body);
    try {
      const userResponse = await this.userService.createUser(userDto);

      console.log(
        `✅[UserController#createUser] User created successfully:`,
        userResponse
      );
      const response = new APIResponse<SignUpResponse>(
        HttpStatus.CREATED,
        constant.ControllerMessage.CREATED,
        userResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.error(
        `❌[UserController#createUser] Error creating user:`,
        error
      );
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(
          new ExpressError(
            500,
            "An unknown error occurred in [UserController#createUser]"
          )
        );
      }
    }
  }

  public async userLogIn(
    req: CustomRequest<EmptyObject, LogInResponse, LogInRequest>,
    res: Response<APIResponse<LogInResponse>>,
    next: NextFunction
  ) {
    const userDto = new UserLogInDto(req.body);
    try {
      const userResponse = await this.userService.userLogIn(userDto);
      console.log(
        `✅ [UserController#userLogIn] User logged in successfully:`,
        userResponse
      );
      const response = new APIResponse<LogInResponse>(
        HttpStatus.OK,
        constant.ControllerMessage.SUCCESS,
        userResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.error(`❌ [UserController#userLogIn] Login error:`, error);
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(
          new ExpressError(
            500,
            "An unknown error occurred in [UserController#userLogIn]"
          )
        );
      }
    }
  }

  public async updateUserProfile(
    req: CustomRequest<
      EmptyObject,
      UpdateProfileResponse,
      UpdateProfileRequest
    >,
    res: Response<APIResponse<UpdateProfileResponse>>,
    next: NextFunction
  ) {
    const profileDto = new UserProfileDto(req.body);
    try {
      const profileResponse = await this.userService.updateUserProfile(
        profileDto
      );
      console.log(
        `✅ [UserController#updateUserProfile] Profile updated successfully:`,
        profileResponse
      );
      const response = new APIResponse<UpdateProfileResponse>(
        HttpStatus.CREATED,
        constant.ControllerMessage.SUCCESS,
        profileResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.error(
        `❌ [UserController#updateUserProfile] Error updating profile:`,
        error
      );
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(
          new ExpressError(
            500,
            "An unknown error occurred in [UserController#updateUserProfile]"
          )
        );
      }
    }
  }

  public async getUserProfile(
    req: CustomRequest<GetUserParams, GetProfileResponse, EmptyObject>,
    res: Response<APIResponse<GetProfileResponse>>,
    next: NextFunction
  ) {
    const profileDto = new GetProfileDto(req.params);
    try {
      const profileResponse = await this.userService.getUserProfile(
        profileDto.userId
      );
      console.log(
        `✅ [UserController#getUserProfile] Profile fetched successfully:`,
        profileResponse
      );
      const response = new APIResponse<GetProfileResponse>(
        HttpStatus.OK,
        constant.ControllerMessage.SUCCESS,
        profileResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.error(
        `❌ [UserController#getUserProfile] Error fetching profile:`,
        error
      );
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(
          new ExpressError(
            500,
            "An unknown error occurred in [UserController#getUserProfile]"
          )
        );
      }
    }
  }

  public async resetPassword(
    req: CustomRequest<
      EmptyObject,
      ResetPasswordResponse,
      ResetPasswordRequest
    >,
    res: Response<APIResponse<ResetPasswordResponse>>,
    next: NextFunction
  ) {
    const userDto = new ResetPasswordDto(req.body);
    try {
      const userResponse = await this.userService.resetPassword(userDto);

      console.log(
        `✅[UserController#resetPassword] password change successfully:`,
        userResponse
      );
      const response = new APIResponse<ResetPasswordResponse>(
        HttpStatus.CREATED,
        constant.ControllerMessage.UPDATED,
        userResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.error(
        `❌[UserController#resetPassword] Error changing password:`,
        error
      );
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(new ExpressError(500, "An unknown error occurred"));
      }
    }
  }
}
