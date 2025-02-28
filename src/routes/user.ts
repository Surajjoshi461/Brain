import express from "express";
import { UserController } from "../controllers/user";
import { UserService } from "../services/user";
import { UserRepository } from "../repositories/user";
import { signUpValidation } from "../middleware/signUpValidation";
import constant from "../commons/constant";

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/sign-up", signUpValidation, (...args) =>
  userController.createUser(...args)
);

router.post("/log-in", (...args) => userController.userLogin(...args));

module.exports = { router, constant.API.BASE_PATH.USER};