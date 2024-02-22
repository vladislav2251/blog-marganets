const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let blogSchema = new mongoose.Schema({
     title: {
          type: [String],
          required: [true, "title is required"],
          trim: true,
     },

     description: {
          type: [String],
          required: [true, "post description is required"],
          trim: true,
     },

     category:{
          type:String,
          required:true,
     },

     numViews:{
          type:Number,
          default: 0,
     },
     tags: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tag",
     }],
          
     images: [{
          public_id: String,
          url: String
     }],

     author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Author is required"],
     },

     comments: [{
          type: String,
          postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
     }],

     author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Author is required"],
     },

}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true });

//Export the model
module.exports = mongoose.model('Blog', blogSchema);