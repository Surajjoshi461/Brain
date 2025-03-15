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

//TODO: SURAJ JOSHI - 14/03/2025 - Need to modify sign-up response according to need. For now it is not is use.
router.post("/signup", signUpValidation, (...args) =>
  userController.createUser(...args)
);

router.post("/login", (...args) => userController.userLogIn(...args));

//contact-us
router.post("/contactus",(...args)=>{
  userController.contactUs(...args)
})

module.exports = { router, basePath: constant.API.BASE_PATH.USER };