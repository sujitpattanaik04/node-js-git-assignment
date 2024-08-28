const mongoose = require("mongoose");
const fs = require("fs");
const Users = require("./userModel");

const users = JSON.parse(fs.readFileSync("./moviesData.json", "utf-8"));

const deleteUsers = async () => {
  try {
    await Users.deleteMany();
    console.log("Data successfully deleted from DB!");
  } catch (err) {
    console.log(err.message);
  }
};

const importUsers = async () => {
  try {
    await Users.insertMany(users);
    console.log("Data successfully inserted in DB!");
  } catch (err) {
    console.log(err.message);
  }
};

if (process.argv[2] === "--import") {
  importUsers();
}

if (process.argv[2] === "--delete") {
  deleteUsers();
}
