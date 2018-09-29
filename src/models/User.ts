import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export type UserModel = mongoose.Document & {
  email: string,
  pwd: string,
  name: string,
  description: string,
  following: mongoose.Schema.Types.ObjectId[]
};

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  pwd: String,
  name: String,
  description: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

userSchema.pre('save', function(next) {
  const user: UserModel = this as UserModel;
 
  if (!user.isModified('pwd')) return next();

  bcrypt.hash(user.pwd, null, null, (err, hash) => {
    if (err) return next(err);

    user.pwd = hash;
    next();
  });
});

const User = mongoose.model<UserModel>("User", userSchema);
export default User;
