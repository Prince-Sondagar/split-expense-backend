import express, { Application } from "express";
import cors from 'cors';
import connectDB from "./config/db";

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';

import { errorHandler } from "./middleware/errorHandler";
import path from "path";
import expenseRoute from "./routes/expenseRoute";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to Database
connectDB();

// Routes
app.get("/", (req: any, res: any) => res.send("Hello World"));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/expenses', expenseRoute);


// Global Error handler
app.use(errorHandler);


export default app;