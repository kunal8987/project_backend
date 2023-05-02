const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { userRoutes } = require("./routes/user.route");
const { postRoutes } = require("./routes/mobile.route");
const { authenticate } = require("./middleware/auth.middleware");
let cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.use(authenticate);

app.use("/post", postRoutes);

app.listen(8000, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    console.log("something went wrong");
  }
  console.log("server listening on 8000");
});
