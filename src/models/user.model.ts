import mongoose from "mongoose";

//* user schema
const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "full_name is required"],
      minLength: [3, "name must be atleast 3 character long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "user already exist with provided email"],
      trim: true,
    },
    password: {
      type: String,
      select:false,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUPERADMIN"],
      default: "USER",
    },
    profile_image: {
      type: String,
    },
    phone: {
      type: String,
      require: false,
      maxLength: [10, "phone number at most be 10 digits long"],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

export default User;
