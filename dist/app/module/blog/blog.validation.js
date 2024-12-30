"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSchemaValidation = exports.UpdateBlogValidationSchema = exports.CreateBlogValidationSchema = void 0;
const zod_1 = require("zod");
const mongodb_1 = require("mongodb");
exports.CreateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .max(255, "Title must not exceed 255 characters")
            .nonempty("Title is required"),
        content: zod_1.z
            .string()
            .min(10, "Content must be at least 10 characters long")
            .nonempty("Content is required"),
        authorId: zod_1.z.string(),
    }),
});
exports.UpdateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .max(255, "Title must not exceed 255 characters")
            .optional(),
        content: zod_1.z
            .string()
            .min(10, "Content must be at least 10 characters long")
            .optional(),
        authorId: zod_1.z
            .instanceof(mongodb_1.ObjectId)
            .refine((id) => id instanceof mongodb_1.ObjectId, {
            message: "Invalid author ID",
        })
            .optional(),
    }),
});
exports.blogSchemaValidation = {
    CreateBlogValidationSchema: exports.CreateBlogValidationSchema,
    UpdateBlogValidationSchema: exports.UpdateBlogValidationSchema,
};
