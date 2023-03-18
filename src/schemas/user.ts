import mongoose from 'mongoose';

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface SavedUser extends User {
    _id: string
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true,  unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<User>('User', userSchema);

export const checkUsernameUsage = async (username: string, email: string) => {
  const user = await UserModel.findOne({username})

  if(user) {
    throw Error("username already in use")
  }

  const userByMail = await UserModel.findOne({ email })

  if(userByMail) {
    throw Error("email already in use")
  }
}