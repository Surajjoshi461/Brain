import express from "express";

import { UserController } from "../controllers/user";
import { UserService } from "../services/user";
import { UserRepository } from "../repositories/user";
import { signUpValidation } from "../middleware/signUpValidation";

const userRouter = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

//TODO: SURAJ JOSHI - 14/03/2025 - Need to modify sign-up response according to need. For now it is not is use.
userRouter.post("/signup", signUpValidation, (...args) =>
  userController.createUser(...args)
);

userRouter.post("/login", (...args) => userController.userLogIn(...args));

export const router = userRouter
export const basePath = '/api/v1/user'