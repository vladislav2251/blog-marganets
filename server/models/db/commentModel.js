const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
     user: {
          type: Object,
          required: [true, "User is required"],
     },

     blog: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blog",
          required: [true, "Blog is required"],
     },

     description: {
          type: String,
          required: [true, "Comment description is required"],
     },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;