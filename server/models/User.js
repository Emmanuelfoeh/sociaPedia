import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please firstName is required"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Please lastName is required"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide an Email Address"],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please password is required"],
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;