import { Router, Request, Response } from 'express';
import { UserModel } from '../schemas/user';
import bcrypt from 'bcrypt';
import { generateToken } from '../shared/auth';

export const loginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({username})
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const passwordMatches = await bcrypt.compare(password, user.password);
  
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = generateToken(user);
  
    return res.json({ token });
}