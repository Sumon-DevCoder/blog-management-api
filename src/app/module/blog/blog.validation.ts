import { z } from "zod";
import { ObjectId } from "mongodb";

export const CreateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .max(255, "Title must not exceed 255 characters")
      .nonempty("Title is required"),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters long")
      .nonempty("Content is required"),
    authorId: z.string(),
  }),
});

export const UpdateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .max(255, "Title must not exceed 255 characters")
      .optional(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters long")
      .optional(),
    authorId: z
      .instanceof(ObjectId)
      .refine((id) => id instanceof ObjectId, {
        message: "Invalid author ID",
      })
      .optional(),
  }),
});

export const blogSchemaValidation = {
  CreateBlogValidationSchema,
  UpdateBlogValidationSchema,
};
