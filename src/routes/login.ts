import { Router } from 'express';
import { checkController, loginController } from '../controllers/login';
import { authMiddleware } from '../shared/auth';

const loginRouter = Router();

loginRouter.post('/', loginController);
loginRouter.get('/check', authMiddleware, checkController)

export default loginRouter;
