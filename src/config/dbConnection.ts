import mongoose from "mongoose";

export async function mongoDBConnection(){
    await mongoose.connect(process.env.MONGO_DB_URL || 'url');
    console.log("MongoDB is Connected Successfully...!")
}