const { pipeline } = require("stream/promises");
const fs = require("fs");
const zlib = require("zlib");
const express = require("express");

const app = express();

app.use(express.json());

// app.get("/", async (req, res) => {
//   try {
//     await pipeline(
//       fs.createReadStream("./sample.txt", "utf-8"),
//       zlib.createGzip(),
//       fs.createWriteStream("./sample.zip", "utf-8")
//     );
//     res.end("OK");
//   } catch (error) {
//     console.log(error);
//   }
// });

app.get("/", (req, res) => {
  const readStream = fs.createReadStream("./sample.txt");
  readStream.on("data", (chunk) => res.write(chunk));
  readStream.on("end", () => res.end());
});

// app.get("/", (req, res) => {
//   const data = fs.readFileSync("./sample.txt", "utf-8");
//   res.send(data);
// });

const port = 4000;

// CREATE SERVER
const server = app.listen(port, () => {
  console.log(`Server started & it is listening on Port:${port}`);
});
