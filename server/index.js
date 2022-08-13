require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const roomRoute = require("./routes/room");
const errorHandler = require("./middleware/errorHandler");
const createSocketServer = require("./services/socket");

const app = express();
const httpServer = new http.Server(app);

createSockerServer(httpServer);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(cookieParser());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use((req, res, next) => {
  console.log("Got request....", req.body);
  next();
});

// simulate delay response
// app.use((req, res, next) => {
//   setTimeout(() => next(), 3000);
// });
app.use("/", authRoute);
app.use("/room", roomRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const dbURI =
  "mongodb+srv://sih:sih@cluster0.smvmbq5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    httpServer.listen(PORT, () => console.log("server running on port 5000"))
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
