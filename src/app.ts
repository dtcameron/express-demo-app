import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import 'express-async-errors';
import * as dotenv from 'dotenv';

import { userRouter } from './routes/users';

export const prisma = new PrismaClient();
export const app = express();
dotenv.config();

app.use(cors()).use(express.json()).options('*', cors());

app.use('/users', userRouter);

// Generic error handler
app.use((error: Error, _request: Request, response: Response, _next: NextFunction): void => {
    response.status(500).json({ error: error.message });
});
