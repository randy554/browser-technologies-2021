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

app.get("/profile/:stdname/:stdnr/:progress", (req, res) => {
  console.log("profilepage route:GET");

  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);

  let userExist = data.filter((value) => {
    if (
      value.studentName == req.params.stdname &&
      value.studentNumber == req.params.stdnr
    ) {
      return value;
    }
  });

  let hasCourse = userExist.filter((has) => {
    if (has.chosenCourse !== "undefined") {
      return has.chosenCourse;
    }
  });

  res.render("profile", {
    progress: req.params.progress,
    hasSurveyAnswers: hasCourse,
    studentName: req.params.stdname,
    studentNumber: req.params.stdnr,
  });
});

app.get("/course/:coursename/:stdname/:stdnr/:progress", (req, res) => {
  console.log("course/coursename/stdname/stdnr route:GET");

  console.log("PARAMS:", req.params.coursename);
  if (req.params.coursename == "hcd") {
    res.render("course", {
      progress: req.params.progress,
      chosenCourse: "Human Centered Design",
      studentName: req.params.stdname,
      studentNr: req.params.stdnr,
    });
  }
  if (req.params.coursename == "pwa") {
    res.render("course", {
      progress: req.params.progress,
      chosenCourse: "Progressive Web Apps",
      studentName: req.params.stdname,
      studentNr: req.params.stdnr,
    });
  }
  if (req.params.coursename == "css") {
    res.render("course", {
      progress: req.params.progress,
      chosenCourse: "CSS To The Rescue",
      studentName: req.params.stdname,
      studentNr: req.params.stdnr,
    });
  }
  if (req.params.coursename == "btech") {
    res.render("course", {
      progress: req.params.progress,
      chosenCourse: "Browser Technologies",
      studentName: req.params.stdname,
      studentNr: req.params.stdnr,
    });
  }
  if (req.params.coursename == "realtime") {
    res.render("course", {
      progress: req.params.progress,
      chosenCourse: "Real-Time Web",
      studentName: req.params.stdname,
      studentNr: req.params.stdnr,
    });
  }
  if (req.params.coursename == "wafs") {
    res.render("course", {
      progress: req.params.progress,
      chosenCourse: "Web Apps From Scratch",
      studentName: req.params.stdname,
      studentNr: req.params.stdnr,
    });
  }

  // res.render("course", {
  //   chosenCourse: req.params.coursename,
  //   studentName: req.params.stdname,
  //   studentNr: req.params.stdnr,
  // });
});

app.post("/course", (req, res) => {
  console.log("course route:POST");

  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);

  // check to see if studentnr is already in database.json
  // let findStudNr = data.filter((value) => {
  //   if (value.studentNumber == req.body.studentNr) {
  //     // console.log("findStud", value);
  //     return value;
  //   }
  // });

  let userExist = data.filter((value) => {
    if (
      value.studentName == req.body.studentName &&
      value.studentNumber == req.body.studentNr
    ) {
      console.log("hoe dan:", value.studentName);
      return value;
    }
  });

  console.log("CHECK USER 1", userExist.length);

  let hasCourse = userExist.filter((has) => {
    if (has.chosenCourse !== "undefined") {
      return has.chosenCourse;
    }
  });

  console.log("heeft course:", hasCourse.length);

  if (userExist.length > 0) {
    console.log("Welcome back!");

    let status = data.filter((update) => {
      if (
        update.studentNumber == req.body.studentNr &&
        update.studentName == req.body.studentName &&
        update.hasOwnProperty("progress")
      ) {
        console.log("binnen progress:", update);
        return update;
      }
    });

    console.log("progress status:", status[0].progress);
    // let progressData = status.progress;

    res.render("profile", {
      progress: status[0].progress,
      hasSurveyAnswers: hasCourse,
      studentName: req.body.studentName,
      studentNumber: req.body.studentNr,
    });
  } else {
    console.log("Welcome!");

    let newUser = {
      studentName: req.body.studentName,
      studentNumber: req.body.studentNr,
      courses: {
        css: "CSS To The Rescue",
        wafs: "Web Apps From Scratch",
        pwa: "Progressive Web Apps",
        btech: "Browser Technologies",
        realtime: "Real-Time Web",
        hcd: "Human Centered Design",
      },
      progress: 0,
    };

    data.push(newUser);
    let save = fs.writeFileSync(
      path.resolve("database.json"),
      JSON.stringify(data, null, 2)
    );

    res.render("profile", {
      progress: newUser.progress,
      hasSurveyAnswers: [],
      studentName: req.body.studentName,
      studentNumber: req.body.studentNr,
    });
  }
});

app.post("/assesment", (req, res) => {
  res.render("assesment");
});

app.post("/successpage", (req, res) => {
  console.log("succespage route:POST");
  console.log("ALLE DATA: ", req.body);

  let messages = [];

  if (!req.body.hasOwnProperty("chosenTeacher")) {
    console.log("Geen docent(en) gekozen!");
    messages.push("Geen docent(en) gekozen!");
  }

  if (!req.body.hasOwnProperty("week")) {
    console.log("Geen les periode gekozen!");
    messages.push("Geen les periode gekozen!");
  }

  if (req.body.rateDifficulty == "" || req.body.rateDifficulty == null) {
    console.log("Beoordeel de lesstof!");
    messages.push("Beoordeel de lesstof!");
  }

  if (req.body.rateExplanation == "" || req.body.rateExplanation == null) {
    console.log("Beoordeel de uitleg van het vak!");
    messages.push("Beoordeel de uitleg van het vak!");
  }

  if (req.body.rateLearning == "" || req.body.rateLearning == null) {
    console.log("Beoordeel je eigen inzicht van het vak!");
    messages.push("Beoordeel je eigen inzicht van het vak!");
  }

  if (messages.length > 0) {
    console.log("niet binnen terug");
    res.render("course_error", {
      progress: req.body.progressValue,
      messages: messages,
      chosenCourse: req.body.chosenCourse,
      studentName: req.body.studentName,
      studentNr: req.body.studentNumber,
    });
  }

  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);

  // check to see if studentnr is already in database.json
  let findStudNr = data.filter((value) => {
    if (
      value.studentNumber == req.body.studentNumber &&
      value.studentName == req.body.studentName
    ) {
      return value;
    }
  });

  // fiso fpweoij weoifpoifwjofiwj

  let chosen = "";

  if (req.body.chosenCourse == "Progressive Web Apps") {
    chosen = "pwa";
  }

  if (req.body.chosenCourse == "CSS To The Rescue") {
    chosen = "css";
  }

  if (req.body.chosenCourse == "Browser Technologies") {
    chosen = "btech";
  }

  if (req.body.chosenCourse == "Real-Time Web") {
    chosen = "realtime";
  }

  if (req.body.chosenCourse == "Web Apps From Scratch") {
    chosen = "wafs";
  }

  if (req.body.chosenCourse == "Human Centered Design") {
    chosen = "hcd";
  }

  // fiso fpweoij weoifpoifwjofiwj

  let coursesToDo = data.map((course) => {
    if (
      course.studentNumber == req.body.studentNumber &&
      course.studentName == req.body.studentName &&
      course.hasOwnProperty("courses")
    ) {
      for (const property in course.courses) {
        console.log(`Property: ${property} - Chosen: ${chosen}`);
        if (property == chosen) {
          console.log(`deleted: ${course.courses[property]}`);
          delete course.courses[property];
        }
      }
    }
    return course;
  });

  data.forEach((update) => {
    if (
      update.studentNumber == req.body.studentNumber &&
      update.studentName == req.body.studentName &&
      update.hasOwnProperty("courses")
    ) {
      console.log("Update 1:", update.progress);
      update.progress = update.progress + 1;
      console.log("Update 2:", update.progress);
    }
  });

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

  /* ---------- NUUUUUUUUUUUUUU ----------  */
  // bewaar het database.json bestand
  let save = fs.writeFileSync(
    path.resolve("database.json"),
    JSON.stringify(data, null, 2)
  );
  /* ---------- NUUUUUUUUUUUUUU ----------  */

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

  let all_courses = data.map((done) => {
    if (
      done.studentName == req.body.studentName &&
      done.studentNumber == req.body.studentNumber &&
      done.hasOwnProperty("courses")
    ) {
      done.progress++;
      return done.courses;
    }
  });

  console.log("iodsfffoi", all_courses);

  let clean = all_courses.filter((values) => {
    if (values != "undefined") {
      return values;
    }
  });

  res.render("successpage", {
    progress: ++req.body.progressValue,
    opgeslagenVak: req.body.chosenCourse,
    resterendeVakken: clean[0],
    studentName: req.body.studentName,
    studentNr: req.body.studentNumber,
  });
});

app.get("finishpage", (req, res) => {
  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Open page @ http://localhost:${process.env.PORT}`)
);
