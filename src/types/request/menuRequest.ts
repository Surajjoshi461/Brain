export type CreateMenuItemRequest = {
  userId: string;
  title: string;
  description?: string;
  price: string;
  brand?: string;
  category: string;
  availability?: string;
  link?: string;
  imageLink?: string;
};

export type UpdateMenuItemRequest = {
  userId: string;
  itemId: string;
  title: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  availability: string;
  link: string;
  imageLink: string;
};

export type DeleteMenuItemRequest = {
  userId: string;
  itemId: string;
};

export type GetMenuItemsParams = {
  userId: string;
};

export type GetMenuItemsQuery = {
  category?: string;
  brand?: string;
  price?: string;
  limit?: string;
  page?: string;
};
