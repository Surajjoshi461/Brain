import { DeleteMenuItemRequest } from "src/types/request/menuRequest";

export class DeleteMenuItemDto {
  userId: string;
  itemId: string;

  constructor(request: DeleteMenuItemRequest) {
    this.userId = request.userId;
    this.itemId = request.itemId;
  }
}
