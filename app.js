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
const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

//rouutes
app.use(projectRoutes);

//Port
const port = 8000;

//server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
