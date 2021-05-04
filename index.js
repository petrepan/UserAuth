const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const user = require("./routes/user");
require("dotenv").config();

const app = express()

connectDB()

//Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use("/api/users", user);

app.get("/", (req, res) => {
  res.status(200).send("Api is running!");
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "This URL cannot be found" });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});