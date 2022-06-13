import validator from "validator";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Please provide valid email"],
    },
    otp: String,
    token: String,
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    statusVerification: {
      type: String,
      enum: ["unverified", "pending", "verified"],
      default: "unverified",
    },
  },
  {
    timestamp: true,
  }
);

const Users = mongoose.model("User", userSchema);
export default Users;
