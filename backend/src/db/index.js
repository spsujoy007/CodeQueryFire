import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\nMONGODB CONNECTED: ${connectionInstance.connection.host.split('-')[1]} 🟢`, )
    } 
    catch (error) {
        console.log("MONGODB CONNECTION ERROR - ❌")
        process.exit(1)
    }
}

export default connectDB