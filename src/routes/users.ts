const express = require('express');
import { getAllUsers, createUser } from '../controllers/users';

export const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
