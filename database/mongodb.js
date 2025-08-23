import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../Config/env.js";

if (!DB_URI) {
    throw new Error('Please provide DB_URI in your environment variables inside .env.<environment>.local file');
} 

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
};
export default connectDB;
