const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const projectRoutes = require("./routes/project");

//DATABASE
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB Connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//rouutes
app.use(projectRoutes);

//Port
const port = 8000;

//server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
