import { UpdateMenuItemRequest } from "src/types/request/menuRequest";

export class UpdateMenuItemDto {
  userId: string;
  itemId: string;
  title?: string;
  description?: string;
  price?: string;
  brand?: string;
  category?: string;
  availability?: string;
  link?: string;
  imageLink?: string;

  constructor(request: UpdateMenuItemRequest) {
    this.userId = request.userId;
    this.itemId = request.itemId;
    this.title = request.title ?? undefined;
    this.description = request.description ?? undefined;
    this.price = request.price ?? undefined;
    this.brand = request.brand ?? undefined;
    this.category = request.category ?? undefined;
    this.availability = request.availability ?? undefined;
    this.link = request.link ?? undefined;
    this.imageLink = request.imageLink ?? undefined;
  }
}
