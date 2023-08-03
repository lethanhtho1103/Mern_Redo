require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const app = express();
const PORT = 5000;

db.connect();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
