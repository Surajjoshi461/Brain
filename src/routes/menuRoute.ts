import express from "express";
import {
  PathParams,
  QueryParams,
  RequestBody,
  ResponseBody,
} from "src/commons/helper/customerRequest/CustomRequest";
import { MenuController } from "src/controllers/menuController";
import { MenuRepository } from "src/repositories/menuRepository";
import { UserRepository } from "src/repositories/userRepository";
import { MenuService } from "src/services/menuService";
import {
  CreateMenuItemRequest,
  DeleteMenuItemRequest,
  GetMenuItemsParams,
  GetMenuItemsQuery,
  UpdateMenuItemRequest,
} from "src/types/request/menuRequest";
import {
  GetMenuItemsResponse,
  MenuItemResponse,
} from "src/types/response/menuResponse";

const menuRouter = express.Router();
const menuRepository = new MenuRepository();
const userRepository = new UserRepository();
const menuService = new MenuService(menuRepository, userRepository);
const menuController = new MenuController(menuService);

menuRouter.post<
  PathParams,
  ResponseBody<MenuItemResponse>,
  RequestBody<CreateMenuItemRequest>,
  QueryParams
>("/create-item", (...args) => menuController.createMenuItem(...args));

menuRouter.patch<
  PathParams,
  ResponseBody<MenuItemResponse>,
  RequestBody<UpdateMenuItemRequest>,
  QueryParams
>("/update-item", (...args) => menuController.updateMenuItem(...args));

menuRouter.delete<
  PathParams,
  ResponseBody<MenuItemResponse>,
  RequestBody<DeleteMenuItemRequest>,
  QueryParams
>("/delete-item", (...args) => menuController.deleteMenuItem(...args));

menuRouter.get<
  PathParams<GetMenuItemsParams>,
  ResponseBody<Array<GetMenuItemsResponse>>,
  RequestBody,
  QueryParams<GetMenuItemsQuery>
>("/items/:userId", (...args) => menuController.getMenuItems(...args));

export const router = menuRouter;
export const basePath = "/api/v1/menu";
