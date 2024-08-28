const express = require("express");
const winston = require("winston");
const morgan = require("morgan");
require("winston-daily-rotate-file");

const app = express();

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: "logs/winston-%DATE%.log",
  maxFiles: "1d",
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss",
    }),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} -> ${level} : ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    // new winston.transports.File({ filename: "app.log" }),
    dailyRotateFileTransport,
  ],
});

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.get("/logger", (req, res) => {
  res.send("He;lo");
});

const port = 3000;

// CREATE SERVER
app.listen(port, () => {
  console.log("Server is started...");
});
