const express = require("express");
const mongoose = require("mongoose");
const lessonRoute = require("./controller/lessonRoute");
const usersRoute = require("./controller/usersRoute");

const User = require("./model/usersSchema");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use('/api', lessonRoute);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.set("strictQuery", true);

mongoose.connect("mongodb+srv://velagapudigokhul26:qwerty123@cluster05321.h6avz3h.mongodb.net/LanguageLearning")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});



app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await User.findOne({ email: email, password: password });

    if (check) {
      res.json("exist");
    } else {
      res.json("not exist");
    }
  } catch (e) {
    console.error(e);
    res.json("not exist");
  }
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const data = {
    username: username,
    email: email,
    password: password,
    courses: [] // Initialize courses as an empty array
  };

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      await User.insertMany([data]);
      res.json("not exist");
    }
  } catch (e) {
    console.error(e);
    res.json("not exist");
  }
});

app.use("/lessonRoute", lessonRoute); 
app.use("/usersRoute", usersRoute);

app.listen(5000, () => {
    console.log("port running on 5000");
});
  

