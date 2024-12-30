import { ObjectId } from "mongoose";

export type TBlog = {
  title: string;
  content: string;
  authorId: ObjectId;
};
