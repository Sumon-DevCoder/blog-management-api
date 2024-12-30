"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../error/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_model_1 = __importDefault(require("./blog.model"));
const blog_constant_1 = require("./blog.constant");
// create
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Blog checking
    const isBlogExists = yield blog_model_1.default.findOne({
        title: payload.title,
    });
    if (isBlogExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Blog already exists");
    }
    const result = yield blog_model_1.default.create(payload);
    return result;
});
// get all
const getAllBlogFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // queryBuilder
    const BlogQuery = new QueryBuilder_1.default(blog_model_1.default.find().populate("user"), query)
        .search(blog_constant_1.BlogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield BlogQuery.countTotal();
    const result = yield BlogQuery.modelQuery;
    // checking data
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Blogs not Exist!");
    }
    return {
        meta,
        result,
    };
});
// get single
const getSingleBlogFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findById({ _id });
    // checking data
    if (result === null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Blogs not exist!");
    }
    return result;
});
const getBlogByUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // Using `find` to fetch all Blogs for the user
    const result = yield blog_model_1.default.find({ user: email });
    // Check if the result is an empty array
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "No Blogs found");
    }
    return result;
});
// update
const updateBlogIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Blog checking
    const isBlogExists = yield blog_model_1.default.findById(_id);
    if (!isBlogExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Blog not exists!");
    }
    const result = yield blog_model_1.default.findByIdAndUpdate(_id, payload, {
        new: true,
    });
    return result;
});
// update
const deleteBlogIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Blog checking
    const BlogData = yield blog_model_1.default.findById(_id);
    if (!BlogData) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Blog not exists!");
    }
    const result = yield blog_model_1.default.findByIdAndDelete(_id, {
        new: true,
    });
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    getSingleBlogFromDB,
    getAllBlogFromDB,
    updateBlogIntoDB,
    deleteBlogIntoDB,
    getBlogByUserFromDB,
};
