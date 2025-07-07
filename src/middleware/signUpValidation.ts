import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

import { SignUpRequest } from "src/types/request/userRequest";
import { SignUpResponse } from "src/types/response/user/userResponse";
import { ExpressError } from "src/commons/helper/errorHandler/expressError";
import {
  APIResponse,
  EmptyObject,
} from "src/commons/helper/apiResponse/apiResponse";
import CustomRequest from "src/commons/helper/customerRequest/CustomRequest";

export async function signUpValidation(
  req: CustomRequest<EmptyObject, SignUpResponse, SignUpRequest>,
  res: Response<APIResponse<SignUpResponse>>,
  next: NextFunction
) {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    if (!email || !firstName || !lastName || !password || !phoneNumber) {
      return next(
        new ExpressError(HttpStatus.FORBIDDEN, "All fields are required")
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(
        new ExpressError(HttpStatus.FORBIDDEN, "Please provide correct email")
      );
    }
    if (password.length < 6) {
      return next(
        new ExpressError(
          HttpStatus.FORBIDDEN,
          "Password must be at least 6 characters"
        )
      );
    }
    next();
  } catch (error) {
    return next(
      new ExpressError(
        HttpStatus.FORBIDDEN,
        `Error in signUpValidation. Error: ${error}`
      )
    );
  }
}
