import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { auth } from "../../middlewares/auth";
import { blogSchemaValidation } from "./blog.validation";
import { BlogControllers } from "./blog.controller";
const router = Router();

// create
router.post(
  "/",
  validateRequest(blogSchemaValidation.CreateBlogValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.createBlog
);

// get all
router.get(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.getAllBlogs
);

// get single by user
router.get(
  "/user/:email",
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.getBlogsByUser
);

// update
router.put(
  "/:id",
  validateRequest(blogSchemaValidation.UpdateBlogValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.updateBlog
);

// delete
router.delete(
  "/:id",
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.deleteBlog
);

export const BlogRoutes = router;
