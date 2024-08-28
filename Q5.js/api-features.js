const express = require("express");
const Movies = require("./movieModel");

const app = express();

app.get("/", async (req, res) => {
  try {
    const excludeFields = ["sort", "page", "limit", "fields"];

    let queryObj = { ...req.query };

    excludeFields.forEach((el) => {
      delete queryObj[el];
    });

    // FILTERING
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    queryObj = JSON.parse(queryStr);

    let query = Movies.find(queryObj);

    // SORTING
    let sortBy;
    if (req.query.sort) {
      sortBy = req.query.sort.split(",").join(" ");
    } else {
      sortBy = "-createdAt";
    }
    query = query.sort(sortBy);

    //  LIMITING FIELDS
    let fields;
    if (req.query.fields) {
      fields = req.query.fields.split(",").join(" ");
    } else {
      fields = "-__v -updatedAt -totalReviews";
    }
    query = query.select(fields);

    // PAGINATION
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    query = query.skip((page - 1) * limit).limit(limit);

    if (req.query.page) {
      const moviesCount = Movies.countDocuments;
      if (skip >= moviesCount) {
        throw new Error("This Page Is Not Found!");
      }
    }

    const movies = await query;

    res.status(200).send(movies);
  } catch (error) {
    console.log(error);
  }
});

const port = 3000;
// CREATE SERVER
app.listen(port, () => {
  console.log("Server is started...");
});
