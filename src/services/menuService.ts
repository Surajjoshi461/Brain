import HttpStatus from "http-status-codes";

import constant from "src/commons/constant";
import { CreateMenuItemDto } from "src/commons/dtos/menu/createMenuItemDto";
import { DeleteMenuItemDto } from "src/commons/dtos/menu/deleteMenuItemDto";
import { GetMenuItemsDto } from "src/commons/dtos/menu/getMenuItemsDto";
import { UpdateMenuItemDto } from "src/commons/dtos/menu/updateMenuItem";
import { ExpressError } from "src/commons/helper/errorHandler/expressError";
import { MenuRepository } from "src/repositories/menuRepository";
import { UserRepository } from "src/repositories/userRepository";
import { GetMenuItemsResponse } from "src/types/response/menuResponse";

export class MenuService {
  private menuRepository: MenuRepository;
  private userRepository: UserRepository;

  constructor(menuRepository: MenuRepository, userRepository: UserRepository) {
    this.menuRepository = menuRepository;
    this.userRepository = userRepository;
  }

  public async createMenuItem(itemDto: CreateMenuItemDto) {
    const isUserExist = await this.userRepository.findUserByUserId(
      itemDto.userId
    );
    if (!isUserExist) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.USER_NOT_FOUND
      );
    }
    await this.menuRepository.createMenuItem(itemDto);
    return { success: true };
  }

  public async updateMenuItem(itemDto: UpdateMenuItemDto) {
    const isUserExist = await this.userRepository.findUserByUserId(
      itemDto.userId
    );
    if (!isUserExist) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.USER_NOT_FOUND
      );
    }
    const updated = await this.menuRepository.updateMenuItem(itemDto);
    if (!updated) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        `Menu item not found or update failed`
      );
    }
    return { success: true };
  }

  public async deleteMenuItem(itemDto: DeleteMenuItemDto) {
    const isUserExist = await this.userRepository.findUserByUserId(
      itemDto.userId
    );
    if (!isUserExist) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.USER_NOT_FOUND
      );
    }
    const deleted = await this.menuRepository.deleteMenuItem(itemDto);
    if (!deleted) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        `Menu item not found or deletion failed`
      );
    }
    return { success: true };
  }

  public async getMenuItems(
    itemDto: GetMenuItemsDto
  ): Promise<Array<GetMenuItemsResponse>> {
    const isUserExist = await this.userRepository.findUserByUserId(
      itemDto.userId
    );
    if (!isUserExist) {
      throw new ExpressError(
        HttpStatus.NOT_FOUND,
        constant.VALIDATION.USER_NOT_FOUND
      );
    }
    const rawResponse = await this.menuRepository.getMenuItems(itemDto);
    return rawResponse.map((item) => ({
      _id: item._id.toString(),
      userId: item.userId,
      title: item.title,
      description: item.description ?? "",
      price: item.price ?? "",
      brand: item.brand ?? "",
      category: item.category ?? "",
      availability: item.availability ?? "in stock",
      link: item.link ?? "",
      imageLink: item.imageLink ?? "",
    }));
  }
}
