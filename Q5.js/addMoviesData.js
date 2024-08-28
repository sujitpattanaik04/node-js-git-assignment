const mongoose = require("mongoose");
const fs = require("fs");
const Movies = require("./movieModel");

const movies = JSON.parse(fs.readFileSync("./moviesData.json", "utf-8"));

const deleteMovies = async () => {
  try {
    await Movies.deleteMany();
    console.log("Data successfully deleted from DB!");
  } catch (err) {
    console.log(err.message);
  }
};

const importMovies = async () => {
  try {
    await Movies.insertMany(movies);
    console.log("Data successfully inserted in DB!");
  } catch (err) {
    console.log(err.message);
  }
};

if (process.argv[2] === "--import") {
  importMovies();
}

if (process.argv[2] === "--delete") {
  deleteMovies();
}
