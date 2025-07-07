import express from "express";

import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { signUpValidation } from "../middleware/signUpValidation";
import { AuthVerification } from "src/middleware/authVerification";
import {
  PathParams,
  QueryParams,
  RequestBody,
  ResponseBody,
} from "src/commons/helper/customerRequest/CustomRequest";
import {
  GetProfileResponse,
  LogInResponse,
  ResetPasswordResponse,
  SignUpResponse,
  UpdateProfileResponse,
} from "src/types/response/user/userResponse";
import {
  GetUserParams,
  LogInRequest,
  ResetPasswordRequest,
  SignUpRequest,
  UpdateProfileRequest,
} from "src/types/request/userRequest";

const userRouter = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

//TODO: SURAJ JOSHI - 14/03/2025 - Need to modify sign-up response according to need. For now it is not in use.
userRouter.post<
  PathParams,
  ResponseBody<SignUpResponse>,
  RequestBody<SignUpRequest>,
  QueryParams
>("/signup", signUpValidation, (...args) => userController.createUser(...args));

userRouter.post<
  PathParams,
  ResponseBody<LogInResponse>,
  RequestBody<LogInRequest>,
  QueryParams
>("/login", (...args) => userController.userLogIn(...args));

userRouter.put<
  PathParams,
  ResponseBody<UpdateProfileResponse>,
  RequestBody<UpdateProfileRequest>,
  QueryParams
>("/profile", (...args) =>
  userController.updateUserProfile(...args)
);

userRouter.get<
  PathParams<GetUserParams>,
  ResponseBody<GetProfileResponse>,
  RequestBody,
  QueryParams
>("/profile/:userId", (...args) =>
  userController.getUserProfile(...args)
);

userRouter.put<
  PathParams,
  ResponseBody<ResetPasswordResponse>,
  RequestBody<ResetPasswordRequest>,
  QueryParams
>("/reset-password", (...args) =>
  userController.resetPassword(...args)
);

export const router = userRouter;
export const basePath = "/api/v1/user";
