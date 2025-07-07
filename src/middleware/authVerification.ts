import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import constant from "src/commons/constant";
import CustomRequest from "src/commons/helper/customerRequest/CustomRequest";
import { ExpressError } from "src/commons/helper/errorHandler/expressError";
import { UserRepository } from "src/repositories/userRepository";
import { UserType } from "src/types/api/userType";
import { UserAuthTokenRequest } from "src/types/request/UserAuthTokenRequest";
import AuthTokenVerification from "src/utils/authTokenVerification";

export async function AuthVerification(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const userRepository = new UserRepository();
  const authHeader = req.headers.authorization;
  let token = authHeader ? authHeader.split(" ")[1] : null;

  // If no token in headers, check cookies. i handle it for both header and for cookie
  if (!token && req.cookies?.authToken) {
    //get token from http-only cookies
    token = req.cookies.authToken;
  }

  if (!token) {
    return next(
      new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.TOKEN_MISSING)
    );
  }
  try {
    const decoded: UserAuthTokenRequest = await AuthTokenVerification.getUser(
      token
    );
    if (!decoded) {
      return next(
        new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE)
      );
    }
    const user: UserType | null = await userRepository.findUserByUserId(
      decoded.userId
    );
    if (!user) {
      return next(
        new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE)
      );
    }
    next();
  } catch (error) {
    return next(
      new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE)
    );
  }
}
