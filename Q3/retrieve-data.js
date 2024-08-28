const mongoose = require("mongoose");
const Movies = require("./movieModel");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const movies = await Movies.find();
    res.send(movies);
  } catch (error) {
    console.log(error);
  }
});

//CONNECT TO MONGODB
mongoose
  .connect("mongodb://localhost:27017/movies")
  .then((connObj) => {
    console.log("DB Connection Successful!");
  })
  .catch((err) => {
    console.log("some error has occurred!");
  });

const port = 4000;

// CREATE SERVER
const server = app.listen(port, () => {
  console.log(`Server started & it is listening on Port:${port}`);
});

module.exports = app;
