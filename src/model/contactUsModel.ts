import mongoose, { Document } from "mongoose";

interface IContact extends Document {
    name: string;
    phoneNumber: string;
    query: string;
}

const contactSchema = new mongoose.Schema({
    name: { type: String, require: true },
    phoneNumber: { type: String, require: true, unique: true },
    query: { type: String }
},
    { timestamps: true })

export default mongoose.model<IContact>('contact', contactSchema);