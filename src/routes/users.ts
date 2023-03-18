import express from 'express';
import { createController } from '../controllers/users';

const usersRouter = express.Router();

usersRouter.post('/', createController);

export default usersRouter;