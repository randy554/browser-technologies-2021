import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { get } from "http";
dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("index route:GET");
  res.render("index");
});

app.get("/course", (req, res) => {
  console.log("course route:GET");
  res.render("course");
});

app.get("/course/:coursename/:stdname/:stdnr", (req, res) => {
  console.log("course/coursename/stdname/stdnr route:GET");

  console.log("PARAMS:", req.params.coursename);
  if (req.params.coursename == "hcd") {
    res.render("hcd");
  }
  if (req.params.coursename == "pwa") {
    res.render("pwa");
  }
  if (req.params.coursename == "css") {
    res.render("css");
  }
  if (req.params.coursename == "btech") {
    res.render("btech");
  }
  if (req.params.coursename == "realtime") {
    res.render("realtime");
  }
  if (req.params.coursename == "wafs") {
    res.render("wafs");
  }

  // res.render("course");
});

app.post("/course", (req, res) => {
  console.log("course route:POST");

  if (req.body.studentName === "" || req.body.studentNr === "") {
    console.log("Name or studentnumber is empty");
    res.render("index_failed", { message: "Vul alle velden in!" });
  }

  if (req.body.studentNr.length !== 9) {
    console.log("Studentnumber is niet geldig");
    res.render("index_failed", { message: "Studentnummer is 9 cijfers lang!" });
  }

  if (typeof req.body.studentNr.length !== "number") {
    console.log("Studentnumber is niet geldig");
    res.render("index_failed", {
      message: "Studentnummer bestaat alleen uit cijfers!",
    });
  }

  // console.log("Hele body req", req.body);

  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);

  // check to see if studentnr is already in database.json
  let findStudNr = data.filter((value) => {
    if (value.studentNumber == req.body.studentNr) {
      // console.log("findStud", value);
      return value;
    }
  });

  let userExist = data.filter((value) => {
    if (
      value.studentName == req.body.studentName &&
      value.studentNumber == req.body.studentNr
    ) {
      // console.log("userExist", value);

      // console.log("DB studentNm", value.studentName);
      // console.log("FORM studentNm", req.body.studentName);
      // console.log("DB studentNr", value.studentNumber);
      // console.log("FORM studentNr", req.body.studentNr);
      console.log("hoe dan:", value.chosenCourse);
      return value.chosenCourse;
    }
  });

  console.log("CHECK USER", userExist.length);

  userExist.forEach((iets) => {
    console.log("magic:", iets.chosenCourse);
  });
  console.log("CHECK USER", userExist);

  // console.log("stuff: ", findStudNr.length);
  if (userExist.length > 0) {
    console.log("Welcome back!");
    res.render("profile", {
      finishedSurvey: userExist,
      studentName: req.body.studentName,
      studentNumber: req.body.studentNr,
    });
  } else {
    console.log("Welcome!");
    res.render("course", {
      studentName: req.body.studentName,
      studentNumber: req.body.studentNr,
    });
    // console.log("dit is de data: ", data);

    // let newUser = {
    //   studentName: req.body.studentName,
    //   studentNumber: req.body.studentNr,
    //   answers: [],
    // };

    // data.push(newUser);
    // let save = fs.writeFileSync(
    //   path.resolve("database.json"),
    //   JSON.stringify(data, null, 2)
    // );
  }
});

app.post("/assesment", (req, res) => {
  res.render("assesment");
});

app.post("/successpage", (req, res) => {
  console.log("succespage route:POST");
  // console.log("ALLE DATA: ", req.body);

  if (!req.body.hasOwnProperty("chosenTeacher")) {
    console.log("Geen docent(en) gekozen!");
  }

  if (!req.body.hasOwnProperty("week")) {
    console.log("Geen les periode gekozen!");
  }

  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);

  // check to see if studentnr is already in database.json
  // let findStudNr = data.filter((value) => {
  //   if (value.studentNumber == req.body.studentNumber) {
  //     return value;
  //   }
  // });

  // console.log("laatziendan: ", findStudNr[0].answers);

  let userAnswers = {
    studentName: req.body.studentName,
    studentNumber: req.body.studentNumber,
    chosenCourse: req.body.chosenCourse,
    chosenTeacher: req.body.chosenTeacher,
    week: req.body.week,
    rateDifficulty: req.body.rateDifficulty,
    rateExplanation: req.body.rateExplanation,
    rateLearning: req.body.rateLearning,
  };

  data.push(userAnswers);

  // voeg cursus antwoorden toe bij ingelogde user
  // data.forEach((value) => {
  //   if (value.studentNumber == req.body.studentNumber) {
  //     value.answers = userAnswers;
  //   }
  // });

  // console.log("NA 1e SAVE: ", data);

  // bewaar het database.json bestand
  let save = fs.writeFileSync(
    path.resolve("database.json"),
    JSON.stringify(data, null, 2)
  );

  // open het database.json bestand opnieuw met up-to-date cursus data
  // let getDBData = fs.readFileSync(path.resolve("database.json"));
  // getDBData = JSON.parse(getDBData);

  // console.log("2e DB FILE INLEZEN: ", getDBData);

  // voeg nieuwe cursus data toe voor ingelogde user
  // let newShit = getDBData.forEach((newValue) => {
  //   if (newValue.studentNumber == req.body.studentNumber) {
  //     newValue.answers = { ...newValue.answers, ...userAnswers2 };

  //     // console.log("newVALUE: ", typeof newValue);
  //     console.log("ANSWERS: ", newValue.answers);
  //     // console.log("USER ANSWERS: ", typeof userAnswers);
  //     return newValue;
  //   }
  // });

  // bewaar nieuwe data in database.json bestand
  // let save2 = fs.writeFileSync(
  //   path.resolve("database.json"),
  //   JSON.stringify(getDBData, null, 2)
  // );

  // let coursesDone = getDBData.map((value) => {
  //   if (value.studentNumber == req.body.studentNumber) {
  //     console.log("GETDB: ", value.answers.chosenCourse);
  //     return value;
  //   }
  // });

  let all_courses = data.filter((done) => {
    if (
      done.studentName == req.body.studentName &&
      done.studentNumber == req.body.studentNumber
    ) {
      console.log("Beantwoorde vakken:", done.chosenCourse);
      return done.chosenCourse;
    }
  });

  res.render("successpage", { opgeslagenVak: req.body.chosenCourse });
});

app.get("finishpage", (req, res) => {
  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Open page @ http://localhost:${process.env.PORT}`)
);
