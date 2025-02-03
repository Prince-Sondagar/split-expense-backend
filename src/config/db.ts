
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`Database Connection Successfull: ${conn.connection.host}`)
        return conn;
    } catch (error: any) {
        console.log(`Error in DB connection:`, error?.message)
        process.exit(1)
    }
}

export default connectDB;