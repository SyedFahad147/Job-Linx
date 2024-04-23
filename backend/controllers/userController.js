import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

//User Register Controller
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please Fill Registration Form Completely!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already Exists!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
  sendToken(user, 200, res, "User Registered Successfully!");
});

//User Login Controller
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please provide email, password and role!", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }
  sendToken(user, 200, res, "User Login Successfully!");
});

//User Logout Controller
export const logout = catchAsyncError(async (re, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "User Logout Successfully!",
    });
});

//Get User
export const getUser = catchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
