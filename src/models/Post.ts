import mongoose from 'mongoose';

export type PostModel = mongoose.Document & {
  msg: string,
  author: mongoose.Schema.Types.ObjectId
};

const postSchema = new mongoose.Schema({
  msg: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model < PostModel > ('Post', postSchema);
export default Post;
