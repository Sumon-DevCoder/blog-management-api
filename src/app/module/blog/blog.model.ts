import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { TBlog } from "./blog.interface";

const BlogSchema: Schema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    authorId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = model<TBlog>("Blog", BlogSchema);
export default Blog;
