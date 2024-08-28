const mongoose = require("mongoose");
// const validator = require("validator");

// Define the user schema
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " Name is a required field "],
      unique: true,
      trim: true,
      maxlength: [100, "Name must have less than 100 characters!"],
      minlength: [5, "Name must have at least 5 characters!"],
      //   validate: [validator.isAlpha, "Name should only contains alphabets!"],
    },
    duration: {
      type: Number,
      required: [true, " Duration is a required field "],
    },
    ratings: {
      type: Number,
      required: true,

      // min: [1, "Ratings must be 1.0 or above"],
      // max: [10, "Ratings must be 10.0 or less"], // Assuming ratings are out of 10

      validate: {
        validator: function (value) {
          return value >= 1 && value <= 10;
        },
        message: "Ratings {VALUE} must be present between 1.0 and 10.0",
      },
    },
    totalReviews: {
      type: Number,
      default: 100,
    },
    director: {
      type: String,
      required: [true, " Directors is a required field "],
    },
    actor: {
      type: String,
      required: [true, " Actor is a required field "],
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
module.exports = mongoose.model("Movies", movieSchema);
