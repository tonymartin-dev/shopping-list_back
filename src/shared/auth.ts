import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SavedUser, User } from '../schemas/user';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateToken = (user: SavedUser): string => {
  const tokenData = { user: {username: user.username, id: user._id}}
  const token = jwt.sign( tokenData, SECRET_KEY, { expiresIn: '24h' });
  return token;
}

export const verifyToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { user: User };
    return decoded.user;
  } catch (error) {
    return null;
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];  

  if (!token) {
    return res.status(401).json({ error: 'Auth token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    
    let tokenUser: {username: string, id: string}

    if(
      typeof decodedToken !== "string" &&
      "user" in decodedToken &&
      "username" in decodedToken.user &&
      "id" in decodedToken.user
    ) {
      tokenUser = decodedToken.user
      req.body.tokenUser = {
        username: tokenUser.username,
        id: tokenUser.id
      }
      next();
      return
    }

    throw Error("Error obtaining data from token")    
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid Token' });
  }
};