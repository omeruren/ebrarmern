import mongoose from "mongoose"

export const connectDb = async () =>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}