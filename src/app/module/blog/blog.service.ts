import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";
import { BlogSearchableFields } from "./blog.constant";

// create
const createBlogIntoDB = async (payload: TBlog) => {
  // Blog checking
  const isBlogExists = await Blog.findOne({
    title: payload.title,
  });

  if (isBlogExists) {
    throw new AppError(StatusCodes.CONFLICT, "Blog already exists");
  }

  const result = await Blog.create(payload);
  return result;
};

// get all
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const BlogQuery = new QueryBuilder(Blog.find().populate("user"), query)
    .search(BlogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await BlogQuery.countTotal();
  const result = await BlogQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blogs not Exist!");
  }

  return {
    meta,
    result,
  };
};

// get single
const getSingleBlogFromDB = async (_id: string) => {
  const result = await Blog.findById({ _id });

  // checking data
  if (result === null) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blogs not exist!");
  }

  return result;
};

const getBlogByUserFromDB = async (email: string) => {
  // Using `find` to fetch all Blogs for the user

  const result = await Blog.find({ user: email });

  // Check if the result is an empty array
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No Blogs found");
  }

  return result;
};

// update
const updateBlogIntoDB = async (_id: string, payload: Partial<TBlog>) => {
  // Blog checking
  const isBlogExists = await Blog.findById(_id);
  if (!isBlogExists) {
    throw new AppError(StatusCodes.CONFLICT, "Blog not exists!");
  }

  const result = await Blog.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

// update
const deleteBlogIntoDB = async (_id: string) => {
  // Blog checking
  const BlogData = await Blog.findById(_id);
  if (!BlogData) {
    throw new AppError(StatusCodes.CONFLICT, "Blog not exists!");
  }

  const result = await Blog.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getSingleBlogFromDB,
  getAllBlogFromDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
  getBlogByUserFromDB,
};
