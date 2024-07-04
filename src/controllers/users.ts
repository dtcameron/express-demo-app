import { Request, Response } from 'express';
import { prisma } from '../app';
import { Prisma } from '@prisma/client';
import { UserCreateInputSchema } from '../../prisma/generated/zod';

export const getAllUsers = async (req: Request, res: Response) => {
    //Possible Extension: Pagination
    const users = await prisma.user.findMany({
        orderBy: { createdAt: req.query.created as Prisma.SortOrder },
    });
    return res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
    // Check valid input
    const validationResult = UserCreateInputSchema.safeParse(req.body);
    if (validationResult.success === false) {
        return res.status(422).json(validationResult.error);
    }

    // Check existing user
    const existingUser = await prisma.user.findFirst({
        where: { email: { equals: req.body.email } },
    });
    if (existingUser) {
        return res.status(409).json({
            validation: 'unique',
            code: 'duplicate_email',
            message: 'Unique constraint failed on the fields: (`email`)',
            path: ['email'],
        });
    } else {
        const user = await prisma.user.create({ data: req.body });
        return res.status(201).json(user);
    }
};
