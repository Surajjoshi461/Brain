export type MenuItemResponse = {
  success: boolean;
};

export type GetMenuItemsResponse = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  availability: string;
  link: string;
  imageLink: string;
};
