import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/course", (req, res) => {
  res.render("course");
});

app.get("/assesment", (req, res) => {
  res.render("assesment");
});

app.get("/successpage", (req, res) => {
  res.render("successpage");
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Open page @ http://localhost:${process.env.PORT}`)
);
