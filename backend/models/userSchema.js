import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    minLength: [3, "Name must contain 3 caharcters!"],
    maxLenght: [30, "Name not exceed till 30 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your Email!"],
    validate: [validator.isEmail, "Please enter valid email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your Phone number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password!"],
    minLength: [8, "Password must contain 8 caharcters!"],
    maxLenght: [32, "Password not exceed till 32 characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Hashing the Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Comparing Password
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

//GENERATING A JWT TOKEN FOR AUTHORIZATION
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
