import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem extends Document {
  userId: string;
  title: string;
  description?: string;
  price: string;
  brand?: string;
  category?: string;
  availability?: string;
  condition?: string;
  link?: string;
  imageLink?: string;
}

const MenuItemSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    price: { type: String, required: true },
    brand: String,
    category: String,
    availability: { type: String, default: "in stock" },
    condition: { type: String, default: "new" },
    link: String,
    imageLink: String,
  },
  { timestamps: true }
);

export default mongoose.model<IMenuItem>("menu_item", MenuItemSchema);
