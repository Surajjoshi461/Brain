import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

import { CreateMenuItemDto } from "src/commons/dtos/menu/createMenuItemDto";
import { DeleteMenuItemDto } from "src/commons/dtos/menu/deleteMenuItemDto";
import { GetMenuItemsDto } from "src/commons/dtos/menu/getMenuItemsDto";
import { UpdateMenuItemDto } from "src/commons/dtos/menu/updateMenuItem";
import {
  APIResponse,
  EmptyObject,
} from "src/commons/helper/apiResponse/apiResponse";
import CustomRequest from "src/commons/helper/customerRequest/CustomRequest";
import { ExpressError } from "src/commons/helper/errorHandler/expressError";
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

export class MenuController {
  private menuService: MenuService;
  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  public async createMenuItem(
    req: CustomRequest<EmptyObject, MenuItemResponse, CreateMenuItemRequest>,
    res: Response<APIResponse<MenuItemResponse>>,
    next: NextFunction
  ) {
    const itemDto = new CreateMenuItemDto(req.body);
    try {
      const itemResponse = await this.menuService.createMenuItem(itemDto);

      console.log(
        `✅[MenuController#createMenuItem] Item created successfully:`,
        itemResponse
      );
      const response = new APIResponse<MenuItemResponse>(
        HttpStatus.CREATED,
        "Item created successfully",
        itemResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.error(
        `❌[MenuController#createMenuItem] Error creating menu item:`,
        error
      );
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(
          new ExpressError(
            500,
            "An unknown error occurred in #MenuController#createMenuItem method."
          )
        );
      }
    }
  }

  public async updateMenuItem(
    req: CustomRequest<EmptyObject, MenuItemResponse, UpdateMenuItemRequest>,
    res: Response<APIResponse<MenuItemResponse>>,
    next: NextFunction
  ) {
    const updateDto = new UpdateMenuItemDto(req.body);
    try {
      const itemResponse = await this.menuService.updateMenuItem(updateDto);
      console.log(
        `✅[MenuController#updateMenuItem] Updated successfully:`,
        itemResponse
      );
      const response = new APIResponse<MenuItemResponse>(
        HttpStatus.OK,
        "Item updated successfully",
        itemResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.error(
        `❌[MenuController#updateMenuItem] Error updating menu item:`,
        error
      );
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(
          new ExpressError(
            500,
            "An unknown error occurred in #MenuController#updateMenuItem method"
          )
        );
      }
    }
  }

  public async deleteMenuItem(
    req: CustomRequest<EmptyObject, MenuItemResponse, DeleteMenuItemRequest>,
    res: Response<APIResponse<MenuItemResponse>>,
    next: NextFunction
  ) {
    try {
      const itemDto = new DeleteMenuItemDto(req.body);
      const deleteResponse = await this.menuService.deleteMenuItem(itemDto);
      console.log(
        `✅[MenuController#deleteMenuItem] Deleted successfully:`,
        deleteResponse
      );
      const response = new APIResponse<MenuItemResponse>(
        HttpStatus.OK,
        "Item deleted successfully",
        deleteResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.error(
        "❌[MenuController#deleteMenuItem] Error deleting menu item:",
        error
      );
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(
          new ExpressError(
            500,
            "An unknown error occurred in [MenuController#deleteMenuItem] "
          )
        );
      }
    }
  }

  public async getMenuItems(
    req: CustomRequest<
      GetMenuItemsParams,
      Array<GetMenuItemsResponse>,
      EmptyObject,
      GetMenuItemsQuery
    >,
    res: Response<APIResponse<Array<GetMenuItemsResponse>>>,
    next: NextFunction
  ) {
    try {
      const itemDto = new GetMenuItemsDto(req.params, req.query);
      const itemsResponse = await this.menuService.getMenuItems(itemDto);
      console.log(
        `✅[MenuController#getMenuItems] Fetch menu items successfully:`,
        itemsResponse
      );
      const response = new APIResponse<Array<GetMenuItemsResponse>>(
        HttpStatus.OK,
        "Items fetched successfully",
        itemsResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      console.error(
        "❌[MenuController#getMenuItems] Error fetching menu items:",
        error
      );
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(
          new ExpressError(
            500,
            "An unknown error occurred in [MenuController#getMenuItems]"
          )
        );
      }
    }
  }
}
