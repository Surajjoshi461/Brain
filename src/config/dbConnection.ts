import mongoose from "mongoose";

import { serverConfig } from ".";

export async function mongoDBConnection() {
    try{
        await mongoose.connect(serverConfig.MONGO_DB_URL);
        console.log(`MongoDB is Connected Successfully...! on: ${serverConfig.MONGO_DB_URL}`)
    }catch(error){
        throw new Error(`Error while connecting to MongoDB. Error: ${error}`);
    }
}