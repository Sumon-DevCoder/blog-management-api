import { StatusCodes } from "http-status-codes";
import { BlogServices } from "./blog.service";
import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";

// create
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog added successfully",
    data: result,
  });
});

// get all
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

// get single
const getSingleBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getSingleBlogFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

// get Blog by user
const getBlogsByUser = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getBlogByUserFromDB(req.params.email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

// update
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.updateBlogIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

// delete
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.deleteBlogIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const BlogControllers = {
  deleteBlog,
  updateBlog,
  createBlog,
  getAllBlogs,
  getSingleBlogs,
  getBlogsByUser,
};
