import { NextFunction, Request, Response } from "express";
import { APIResponse, EmptyObject } from "../commons/helper/apiReponse";
import { SignUpResponse } from "../types/response/user/signUpResponse";
import { SignUpRequest } from "../types/request/user/signUpRequest";

export async function signUpValidation(
  req: Request<EmptyObject, APIResponse<SignUpResponse>, SignUpRequest>,
  res: Response<APIResponse<SignUpResponse>>,
  next: NextFunction
) {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    if (!email || !firstName || !lastName || !password || !phoneNumber) {
      return next(Error("All fields are required"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new Error("Please provide correct email"));
    }
    if (password.length < 6) {
      return next(new Error("Password must be at least 6 characters"));
    }
    next();
  } catch (error) {
    return next(`Error in signUpValidation. Error: ${error}`);
  }
}
