const winston = require("winston");
const { combine, timestamp, printf, json, prettyPrint, errors, cli } =
  winston.format;
const DailyRotateFile = require("winston-daily-rotate-file");
const morgan = require("morgan");
const express = require("express");
const app = express();
const logger = winston.createLogger({
  level: "info",
  //   format: winston.format.cli(),
  //   format: winston.format.json(),
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss",
    }),
    printf(
      (el) => `[${el.timestamp}] ${el.level.toUpperCase()}: ${el.message}`
    ),
    errors({ stack: true })
  ),
  transports: [
    new winston.transports.Console({ format: cli() }),
    // new winston.transports.File({ filename: "combined.log" }),
    new DailyRotateFile({
      filename: "logs/winston-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "15d",
    }),
  ],
});
const customFormat =
  ":method :url :status :res[content-length] - :response-time ms";
app.use(
  morgan(customFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseSize: message.split(" ")[3],
          responseTime: message.split(" ")[4],
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
