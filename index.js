const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const links = require("./routes/links");
require("dotenv").config();

app.use(
  cors({
    origin: "https://link-dock.vercel.app",
  })
);
app.use(express.json());
app.use("/", auth);
app.use("/", links);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("[+] DB connected");
  })
  .catch((err) => {
    console.log("[-] DB connection failed");
    console.log(err);
  });

app.listen(process.env.PORT || 5000, () => console.log("[+] server running"));
