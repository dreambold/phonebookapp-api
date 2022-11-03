require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const { createProxyMiddleware } = require("http-proxy-middleware");

//My routes

const contactRoute = require("./routes/contact");

// DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED...");
  })
  .catch(() => {
    console.log(`DB GOT OOOPS...`);
  });

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//My routes
app.get("/", (req, res) => {
  return res.send("Welcome to NodeJS Backend");
});

app.use("/api", contactRoute);

//PORT
var port = process.env.PORT || 8000;

//Staring Server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
