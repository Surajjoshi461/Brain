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
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      console.log("All fields are required");
      return next(Error("Please provide all fields"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("email is not valid");
      return next(new Error("Please provide correct email"));
    }
    if (password.length < 6) {
      console.log("Password must be at least 6 characters");
      return next(new Error("Password must be at least 6 characters"));
    }
    next();
  } catch (error) {
    console.log("Error in signUpValidation");
    return next(error);
  }
}
