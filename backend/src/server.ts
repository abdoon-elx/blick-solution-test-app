import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoutes from './routes/items';
import {setupMiddleware} from "./middleware";
import {connectDB} from "./config/db";

dotenv.config();

const app: Application = express();

// Validate and parse PORT
const PORT: number = parseInt(process.env.PORT || '5000', 10);

// Validate MONGO_URI
const MONGO_URI: string | undefined = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
}

// Middleware
setupMiddleware(app);

// Routes
app.use('/items', itemRoutes);

// MongoDB connection and server start
connectDB(MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
