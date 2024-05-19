const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const useRouter = require("./Routes/auth");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());

app.use("/auth", cors(), useRouter);
console.log("process.env.MONGODB_PASS ====>", process.env.MONGODB_PASS);
mongoose
  .connect(
    `mongodb+srv://nilesh7874:${process.env.MONGODB_PASS}@mycluster.ypdwtyg.mongodb.net/recipeapp`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

app.listen(3001, () => {
  console.log("Server Started on port 3001");
});
