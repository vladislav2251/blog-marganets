const User = require("../models/db/userModel.js");
const Blog = require("../models/db/blogModel.js");
const Comment = require('../models/db/commentModel');
const ErrorHandler = require("../utils/errorHandler.js");
const asyncHandler = require("../middlewares/asyncHandler.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const slugify = require("slugify");

const createComment = asyncHandler(async (req, res, next) => {
     const { description } = req.body;

     const comment = await Comment.create({
          description,
          blog: req.body.blogId,
          user: req.user.id,
     });

     await Blog.findByIdAndUpdate(req.body.blogId, {
          $push: { comments: comment._id },
     }, { new: true });

     await User.findByIdAndUpdate(req.user.id, {
          $push: { comments: comment._id },
     }, { new: true });

     res.status(201).json({
          success: true,
          comment,
     });
});

const getAllComments = asyncHandler(async (req, res, next) => {
     const comments = await Comment.find();
     if (!comments) return next(new ErrorHandler("Comments not found", 404));

     res.status(200).json({
          success: true,
          comments,
     });
});

const getComment = asyncHandler(async (req, res, next) => {
     const comment = await Comment.findById(req.params.id);
     if (!comment) return next(new ErrorHandler("Comment not found", 404));

     res.status(200).json({
          success: true,
          comment,
     });
});

const updateComment = asyncHandler(async (req, res, next) => {
     const comment = await Comment.findByIdAndUpdate(req.params.id, {
          description: req.body.description,
     }, { new: true });

     res.status(200).json({
          success: true,
          comment,
     });
});

const deleteComment = asyncHandler(async (req, res, next) => {
     const comment = await Comment.findByIdAndDelete(req.params.id);

     await Blog.findByIdAndUpdate(req.body.blogId, {
          $pull: { comments: comment._id },
     }, { new: true });

     await User.findByIdAndUpdate(req.user.id, {
          $pull: { comments: comment._id },
     }, { new: true });

     res.status(200).json({
          success: true,
          comment,
     });
});

module.exports = { createComment, getAllComments, getComment, updateComment, deleteComment };