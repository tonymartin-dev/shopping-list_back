import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/user';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateToken = (user: User): string => {
  const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '24h' });
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
