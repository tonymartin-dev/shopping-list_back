import express from 'express';
import { createController } from '../controllers/users';
import { authMiddleware } from '../shared/auth';

const usersRouter = express.Router();

usersRouter.post('/', authMiddleware, createController);

export default usersRouter;