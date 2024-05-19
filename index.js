const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const useRouter = require("./Routes/auth");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(bodyParser.json());
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/auth", useRouter);

mongoose
  .connect(
    `mongodb+srv://ratna1234:${process.env.MONGODB_PASS}@cluster0.ehiha.mongodb.net/`,
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
