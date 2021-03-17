import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome home");
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Open page @ http://localhost:${process.env.PORT}`)
);
