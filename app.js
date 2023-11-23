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
var whitelist = [
  "https://cool-rugelach-ded7b8.netlify.app",
  "https://master--cool-rugelach-ded7b8.netlify.app/",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}.use(cors(corsOpts));

//rouutes
app.use(projectRoutes);

//Port
const port = 8000;

//server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
