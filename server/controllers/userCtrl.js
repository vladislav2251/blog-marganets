const User = require("../models/db/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncHandler = require("../middlewares/asyncHandler.js");
const sendToken = require("../utils/sendToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

const createUser = asyncHandler(async (req, res, next) => {
     const { name, email, password } = req.body;

     try {

          const myCloud = await cloudinary.v2.uploader.upload(req?.body?.avatar, {
               folder: "avatars",
               width: 150,
               crop: "scale",
          });
     
          const user = await User.create({
               name,
               email,
               password,
               avatar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
               },
          });
     
          sendToken(user, 201, res);

     } catch (err) {
          throw new Error(err);
     };
});

const loginUser = asyncHandler(async (req, res, next) => {
     const { email, password } = req.body;

     try {

          if (!email || !password) return next(new ErrorHandler("Please enter email and password", 400));

          const user = await User.findOne({ email }).select("+password");
          if (!user) return next(new ErrorHandler("Invalid email or password", 401));
          
          const isPasswordMatched = await user.comparePassword(password);
          if (!isPasswordMatched) return next(new ErrorHandler("Invalid email or password", 401));
          
          sendToken(user, 201, res);

     } catch (err) {
          return next(new ErrorHandler(err));
     };
});

const forgotPassword = asyncHandler(async (req, res, next) => {

     const user = await User.findOne({email: req.body.email});
     if(!user) return next(new ErrorHandler("User Not Found", 404));
 
     const resetToken = await user.getResetPasswordToken();
 
     await user.save({ validateBeforeSave: false });

     const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
     const message = `
                    <html>
                    <head>
                    <style>
                         body {
                              font-family: Arial, sans-serif;
                              text-align: center;
                         }

                         .container {
                              width: 50%;
                              margin: auto;
                              padding: 20px;
                              border: 1px solid #ccc;
                              border-radius: 8px;
                              background-color: #f5f5f5;
                         }

                         h2 {
                              color: #333;
                         }

                         p {
                              color: #555;
                              text-align: center; /* Center text within paragraphs */
                              margin-bottom: 15px; /* Add some space between paragraphs */
                         }

                         a {
                              color: #ffffff;
                              text-decoration: none; /* Corrected typo here */
                         }

                         .button {
                              display: inline-block;
                              padding: 10px 20px;
                              font-size: 16px;
                              text-align: center;
                              text-decoration: none;
                              cursor: pointer;
                              background-color: #000000;
                              border-radius: 4px;
                              color: #ffffff; /* Set text color for the button */
                         }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                         <h2>Password Reset</h2>
                         <img style="width: 100%; height: 550px;" src="https://cdn.discordapp.com/attachments/998880915474350161/1025124923775127672/80C1DC67-8CC7-469B-BCC3-C878EF497370.gif?ex=659704fb&is=65848ffb&hm=84e583804a5ee06029b802c4a9aa11bc0f3a7499218f0df84d429d19130680d6&" alt="Hello world!" />
                         <p>Your password reset token is:</p>
                         <p>This is some additional text explaining the password reset process. You can add more information here.</p>
                         <p style="text-align: center;"> <a href="${resetPasswordUrl}" class="button" style="color: white;">Reset Password</a> </p>
                    </div>
                    </body>
               </html>
     `;

     try {

          await sendEmail({
               email: user.email,
               subject: "Please reset your password.",
               html: message,
           });

           res.status(200).json({
               success: true,
               message: `Email sent to ${user.email} successfully`,
           });

     } catch (error) {

          user.resetPasswordExpire = undefined;
          user.resetPasswordToken = undefined;

          await user.save({ validateBeforeSave: false });

     };
});

const getAllUsers = asyncHandler(async (req, res, next) => {
     const users = await User.find();
     if (!users) return next(new ErrorHandler("Users not found", 400));

     res.status(200).json(users);
});

const getUserDetails = asyncHandler(async (req, res, next) => {
     const user = await User.findById(req.user.id);
     console.log(user);
     if (!user) return next(new ErrorHandler("User not found", 400));

     res.status(200).json({
          success: true,
          user,
     });
});

const getSingleUser = asyncHandler(async (req, res, next) => {
     const user = await User.findById(req.params.id);
     if (!user) return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));

     res.status(200).json({
          success: true,
          user,
     });
});

const logoutUser = asyncHandler(async (req, res, next) => {
      res.cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
     });

     res.status(200).json({
          success: true,
          message: "Logged Out",
     });
});

const updateProfile = asyncHandler(async (req, res, next) => {
     const user = await User.findByIdAndUpdate(req.user.id, {
          name: req.body.name,
     }, {
          new: true,
          runValidators: true,
          useFindAndModify: true,
     });

     res.status(200).json({
          success: true,
          user,
     });
});

const updatePassword = asyncHandler(async (req, res, next) => {
     const user = await User.findById(req.user.id).select("+password");
     const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

     if (!isPasswordMatched) return next(new ErrorHandler("Old password is invalid", 400));

     user.password = req.body.newPassword;

     await user.save();

     sendToken(user, 201, res);
});

const resetPassword = asyncHandler(async (req, res, next) => {

     const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

     const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpire: { $gt: Date.now() },
     });

     if (!user) return next(new ErrorHandler("Invalid reset password token", 404));

     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;

     await user.save();
     sendToken(user, 201, res);
});

const updateUserRole = asyncHandler(async (req, res, next) => {
     const user = await User.findByIdAndUpdate(req.params.id, {
          role: req.body.role,
     }, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
     });

     res.status(200).json({
          success: true,
          user,
     });
});

const deleteUser = asyncHandler(async (req, res, next) => {
     const user = await User.findByIdAndDelete(req.params.id);
     if (!user) return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));

     res.status(200).json({
          success: true,
          user,
     });
});

module.exports = { 
     createUser, 
     logoutUser, 
     loginUser, 
     forgotPassword,
     getAllUsers, 
     getSingleUser, 
     getUserDetails,
     updateProfile,
     updatePassword,
     resetPassword,
     updateUserRole,
     deleteUser
};