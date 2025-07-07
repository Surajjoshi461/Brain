import { CreateMenuItemRequest } from "src/types/request/menuRequest";

export class CreateMenuItemDto {
  userId: string;
  title: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  availability: string;
  link: string;
  imageLink: string;

  constructor(request: CreateMenuItemRequest) {
    this.userId = request.userId;
    this.title = request.title;
    this.description = request.description ?? "";
    this.price = request.price
    this.brand = request.brand ?? "";
    this.category = request.category ?? "";
    this.availability = request.availability ?? "in stock";
    this.link = request.link ?? "";
    this.imageLink = request.imageLink ?? "";
  }
}
