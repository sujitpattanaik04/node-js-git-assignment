const mongoose = require("mongoose");
const validator = require("validator");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      minlength: [2, "Name must have at least 2 characters!"],
      validate: [validator.isAlpha, " Name should only contains alphabets! "],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, " Please enter a valid email! user"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [2, "Password must be at least 2 characters long"],
      select: false,
    },
  },
  { timestamps: true }
);

mongoose
  .connect("mongodb://localhost:27017/movies")
  .then((connObj) => {
    console.log("DB Connection Successful!");
  })
  .catch((err) => {
    console.log("some error has occurred!");
  });

// Create a model from the schema
module.exports = mongoose.model("Users", userSchema);
