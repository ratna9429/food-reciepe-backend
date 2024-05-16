const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const useRouter = require("./Routes/auth");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/auth", useRouter);

mongoose
  .connect(
    "mongodb+srv://nilesh7874:mongodb123@mycluster.ypdwtyg.mongodb.net/recipeapp",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(3001, () => {
      console.log("Server Started on port 3001");
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });
