require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

//My routes

const contactRoute = require("./routes/contact");

//DB connection
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
    console.log("DB GOT OOOPS  {error}_something went wrong");
  });

//Middelewere
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.get("/", (req, res) => {
  return res.send("hello world ! Welcome to NodeJS Backend");
});

app.use("/api", contactRoute);

//PORT
var port = process.env.PORT || 8000;

//Staring Server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
