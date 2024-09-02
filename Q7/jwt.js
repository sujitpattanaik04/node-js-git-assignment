const jwt = require("jsonwebtoken");
const Users = require("./userModel");
const util = require("util");
const express = require("express");

const app = express();

app.use(express.json());

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
app.post("/authenticate", async (req, res, next) => {
  // Read token
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  if (!token) {
    throw new Error("You have to login to access this route!");
  }
  // Validate token (Here decoded token stores the payload of the JWT)
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    "what04-can13-they49-do299"
  );
  // Check whether user exists or not
  const user = await Users.findById(decodedToken.id);
  if (!user) {
    throw new Error(" User with the given token doesn't exist! ");
  }
  // Check whether user changed password after the token was issued
  if (await user.isPasswordChanged(decodedToken.iat)) {
    throw new Error(
      " Password has been changed recently. Please login again! "
    );
  }
  // Allow user to access route
  next();
});
const port = 3000;
app.listen(port, () => {
  console.log("Server is started...");
});
