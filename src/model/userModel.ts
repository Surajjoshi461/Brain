import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  profilePic: string;
  emailVerified: boolean;
  isActive: boolean;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("user", userSchema);
