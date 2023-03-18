import { Request, Response } from 'express';
import { checkUsernameUsage, UserModel } from '../schemas/user';
import { hashPassword } from '../shared/auth';

export const createController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if(
        typeof username !== "string" || 
        typeof email !== "string" ||  
        typeof password !== "string"
    ) {
        throw Error("Username, email and password are mandatory fields")
    }

    await checkUsernameUsage(username, email)

    const hashedPassword = await hashPassword(password);
    const user = new UserModel({ username, email, password: hashedPassword });
    const { _id} = await user.save();
    res.json({username, email, _id});
  } catch (error) {
    res.status(400).json({ error: (error as Error).toString() });
  }
}
