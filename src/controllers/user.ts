import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

import { UserService } from "../services/user";
import { SignUpRequest } from "../types/request/user/signUpRequest";
import { APIResponse, EmptyObject } from "../commons/helper/apiReponse";
import { SignUpResponse } from "../types/response/user/signUpResponse";
import { UserSignUpDto } from "../commons/dtos/userSignUpDto";
import constant from "../commons/constant";
import { LogInResponse } from "../types/response/user/logInResponse";
import { LogInRequest } from "../types/request/user/logInRequest";

export class UserController {
  private _userService: UserService;
  constructor(userService: UserService) {
    this._userService = userService;
  }

  public async createUser(
    req: Request<EmptyObject, APIResponse<SignUpResponse>, SignUpRequest>,
    res: Response<APIResponse<SignUpResponse>>,
    next: NextFunction
  ) {
    const userDto = new UserSignUpDto(req.body);
    try {
      const userResponse = await this._userService.createUser(userDto);
      const response = new APIResponse<SignUpResponse>(
        HttpStatus.CREATED,
        constant.ControllerMessage.CREATED,
        userResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.log(`Error in user controller`);
      next(error);
    }
  }

  public async userLogIn(
    req: Request<EmptyObject, APIResponse<LogInResponse>, LogInRequest>,
    res: APIResponse<LogInResponse>,
    next: NextFunction
  ) {
    const userDto = new UserLogInDto(req.body);
    try {
      const userResponse = await this._userService.userLogIn()
      const response = new APIResponse<LogInResponse>(
        HttpStatus.CREATED,
        constant.ControllerMessage.SUCCESS,
        userResponse
      );
    } catch (error) {
      console.log("Error in #UserController/userLogin");
      next(error);
    }
  }
}
