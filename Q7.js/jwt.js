const jwt = require("jsonwebtoken");
const Users = require("./userModel");
const express = require("express");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    sendResponse(newUser, 201, req, res);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide required credentials!");
    }

    const user = await Users.findOne({ email }).select("+password");

    if (!user || user.password !== password) {
      throw new Error("Invalid credentials!");
    }

    sendResponse(user, 200, req, res);
  } catch (error) {
    console.log(error);
  }
});

const signToken = (id) => {
  return jwt.sign({ id }, "what04-can13-they49-do299", {
    expiresIn: 1000,
  });
};

const sendResponse = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const port = 3000;

app.listen(port, () => {
  console.log("Server is started...");
});
