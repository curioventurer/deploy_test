import express from "express";
import http from "http";
import fs from "fs";
import routes from "./route.js";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
 
function getTimestamp() {
  const time = new Date();
  return time.toISOString();
}

//Log server request
let requestCount = 0;
app.use(function (req, _, next) {
  const timestamp = getTimestamp();
  const url = req.originalUrl;

  requestCount++;
  const requestLog =
    timestamp +
    " " +
    requestCount.toString().padStart(3, " ") +
    " " +
    req.method.padEnd(6, " ") +
    " " +
    url;

  fs.appendFile("./request.log", requestLog + "\n", () => {});
  console.log(requestLog);

  next();
});

routes(app);

server.listen(port, function () {
  const timestamp = getTimestamp();
  const serverStartLog = `${timestamp} - Server is listening on port ${server.address().port}`;
  fs.appendFile("./request.log", "\n" + serverStartLog + "\n", () => {});
  console.log(serverStartLog);
});