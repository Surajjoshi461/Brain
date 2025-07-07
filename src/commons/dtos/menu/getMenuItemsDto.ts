import { GetMenuItemsParams, GetMenuItemsQuery } from "src/types/request/menuRequest";

export class GetMenuItemsDto {
  userId: string;
  category?: string;
  brand?: string;
  price?: string;
  limit: number;
  skip: number;

  constructor(params: GetMenuItemsParams, query: GetMenuItemsQuery) {
    this.userId = params.userId;
    this.category = query.category;
    this.brand = query.brand;
    this.price = query.price;

    const limit = parseInt(query.limit || "10", 10);
    const page = parseInt(query.page || "1", 10);

    this.limit = limit;
    this.skip = (page - 1) * limit;
  }
}
