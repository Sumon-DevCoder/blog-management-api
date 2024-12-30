"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const BlogSchema = new mongoose_1.Schema({
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
        type: mongodb_1.ObjectId,
        required: true,
        ref: "User",
    },
}, { timestamps: true });
const Blog = (0, mongoose_1.model)("Blog", BlogSchema);
exports.default = Blog;
