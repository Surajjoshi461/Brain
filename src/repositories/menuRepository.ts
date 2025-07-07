  import { CreateMenuItemDto } from "src/commons/dtos/menu/createMenuItemDto";
  import { DeleteMenuItemDto } from "src/commons/dtos/menu/deleteMenuItemDto";
  import { GetMenuItemsDto } from "src/commons/dtos/menu/getMenuItemsDto";
  import { UpdateMenuItemDto } from "src/commons/dtos/menu/updateMenuItem";
  import menuModel from "src/model/menuModel";

  export class MenuRepository {
    public async createMenuItem(itemDto: CreateMenuItemDto) {
      await menuModel.create(itemDto);
    }

  public async updateMenuItem(itemDto: UpdateMenuItemDto) {
    const { itemId, userId, ...updateFields } = itemDto;

    const updated = await menuModel.findOneAndUpdate(
      { _id: itemId, userId: userId },
      { $set: updateFields },
      { new: true }
    );

    return updated;
  }

  public async deleteMenuItem(itemDto: DeleteMenuItemDto) {
    return menuModel.findOneAndDelete({
      _id: itemDto.itemId,
      userId: itemDto.userId,
    });
  }

  public async getMenuItems(itemDto: GetMenuItemsDto) {
    const filter: Record<string, any> = {
      userId: itemDto.userId,
    };

    if (itemDto.category) filter.category = itemDto.category;
    if (itemDto.brand) filter.brand = itemDto.brand;
    if (itemDto.price) filter.price = itemDto.price;

    return menuModel
      .find(filter)
      .skip(itemDto.skip)
      .limit(itemDto.limit)
      .lean();
  }
}
