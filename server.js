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
app.use(express.json());

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
});

app.post("/nextcoursejs", (req, res) => {
  console.log("Request from nextCourse", req.body);

  if (req.body.chosenCourse == "Human Centered Design") {
    res.render("nextcourse", {
      progress: ++req.body.progressValue,
      chosenCourse: "Human Centered Design",
      studentName: req.body.studentName,
      studentNr: req.body.studentNumber,
      currentCourse: "Human Centered Design",
    });
  }
  if (req.body.chosenCourse == "Progressive Web Apps") {
    res.render("nextcourse", {
      progress: ++req.body.progressValue,
      chosenCourse: "Progressive Web Apps",
      studentName: req.body.studentName,
      studentNr: req.body.studentNumber,
      currentCourse: "Progressive Web Apps",
    });
  }
  if (req.body.chosenCourse == "CSS To The Rescue") {
    res.render("nextcourse", {
      progress: ++req.body.progressValue,
      chosenCourse: "CSS To The Rescue",
      studentName: req.body.studentName,
      studentNr: req.body.studentNumber,
      currentCourse: "CSS To The Rescue",
    });
  }
  if (req.body.chosenCourse == "Browser Technologies") {
    res.render("nextcourse", {
      progress: ++req.body.progressValue,
      chosenCourse: "Browser Technologies",
      studentName: req.body.studentName,
      studentNr: req.body.studentNumber,
      currentCourse: "Browser Technologies",
    });
  }
  if (req.body.chosenCourse == "Real-Time Web") {
    res.render("nextcourse", {
      progress: ++req.body.progressValue,
      chosenCourse: "Real-Time Web",
      studentName: req.body.studentName,
      studentNr: req.body.studentNumber,
      currentCourse: "Real-Time Web",
    });
  }
  if (req.body.chosenCourse == "Web Apps From Scratch") {
    res.render("course", {
      progress: ++req.body.progressValue,
      chosenCourse: "Web Apps From Scratch",
      studentName: req.body.studentName,
      studentNr: req.body.studentNumber,
      currentCourse: "Web Apps From Scratch",
    });
  }
  // res.json({ status: true });
});

app.post("/course", (req, res) => {
  console.log("course route:POST PROFILE PAGE WITH/WITHOUT JS");

  // Assign JSON file contents to variable
  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);

  // Does user input match a user's credentials in the DB?
  let userExist = data.filter((value) => {
    if (
      (value.studentName == req.body.studentName &&
        value.studentNumber == req.body.studentNr) ||
      value.studentNumber == req.body.studentNumber
    ) {
      console.log("hoe dan:", value.studentName);
      return value;
    }
  });

  console.log("CHECK USER 1", userExist.length);

  // How many courses has student completed?
  let hasCourse = userExist.filter((has) => {
    if (has.chosenCourse !== "undefined") {
      return has.chosenCourse;
    }
  });

  console.log("heeft course:", hasCourse.length);

  // If user exist in database.json
  if (userExist.length > 0) {
    console.log("Welcome back!");

    // After survey
    if (req.body.afterSurvey) {
      console.log("binnen survvvvvvvvey");

      // ======================== validate forms

      console.log("ALLE DATA: ", req.body);

      let messages = [];

      if (!req.body.hasOwnProperty("teacher")) {
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
      } else {
        // ======================== validate forms
        let chosen = "";

        // Determine which survey was taken
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

        console.log("GAAAT HIEERRRR DOOOR NAARRRR DELETE 1");
        // Delete completed survey from the student's survey list
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

        console.log("NO FUGAZY:", data);
        // Update users suvey progress
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

        // Accumulate user answers
        let userAnswers = {
          studentName: req.body.studentName,
          studentNumber: req.body.studentNumber,
          chosenCourse: req.body.chosenCourse,
          chosenTeacher: req.body.teacher,
          week: req.body.week,
          rateDifficulty: req.body.rateDifficulty,
          rateExplanation: req.body.rateExplanation,
          rateLearning: req.body.rateLearning,
        };

        // store user answers to array
        data.push(userAnswers);

        // store user answers to file
        let save = fs.writeFileSync(
          path.resolve("database.json"),
          JSON.stringify(data, null, 2)
        );

        console.log("GAAAT HIEERRRR DOOOR NAARRRR DELETE 1");
        // Get all remaining courses from user
        let all_courses = data.map((done) => {
          if (
            done.studentName == req.body.studentName &&
            done.studentNumber == req.body.studentNumber &&
            done.hasOwnProperty("courses")
          ) {
            // done.progress++;
            return done.courses;
          }
        });

        console.log("iodsfffoi", all_courses);

        // Remove undefined values from remaining survey list
        let clean = all_courses.filter((values) => {
          if (values != "undefined") {
            return values;
          }
        });

        // ======================= latest survey

        let latestUserCheck = data.filter((value) => {
          if (
            (value.studentName == req.body.studentName &&
              value.studentNumber == req.body.studentNr) ||
            value.studentNumber == req.body.studentNumber
          ) {
            console.log("hoe dan:", value.studentName);
            return value;
          }
        });

        let finishedSurvey = latestUserCheck.filter((finished) => {
          if (finished.chosenCourse !== "undefined") {
            console.log("WAT DE DEAL?", finished.chosenCourse);
            return finished.chosenCourse;
          }
        });

        // ======================= latest survey
        console.log("GAAAT HIEERRRR DOOOR NAARRRR DELETE 2");
        // Show profile page
        res.render("profile", {
          progress: ++req.body.progressValue,
          hasSurveyAnswers: finishedSurvey,
          resterendeVakken: clean[0],
          studentName: req.body.studentName,
          studentNumber: req.body.studentNumber,
        });
      }
    } else {
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

      // Get all remaining courses from user
      let all_surveys = data.map((done) => {
        if (
          done.studentName == req.body.studentName &&
          done.studentNumber == req.body.studentNr &&
          done.hasOwnProperty("courses")
        ) {
          // done.progress++;
          return done.courses;
        }
      });

      console.log("PAS BINNNENEN TOCHHHHHHH", all_surveys);

      // Remove undefined values from remaining survey list
      let clean = all_surveys.filter((values) => {
        if (values != "undefined") {
          return values;
        }
      });

      console.log("progress status:", status[0].progress);
      // let progressData = status.progress;

      res.render("profile", {
        progress: status[0].progress,
        hasSurveyAnswers: hasCourse,
        studentName: req.body.studentName,
        studentNumber: req.body.studentNr,
        resterendeVakken: clean[0],
      });
    }

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

    // console.log("progress status:", status[0].progress);
    // let progressData = status.progress;

    // res.render("profile", {
    //   progress: status[0].progress,
    //   hasSurveyAnswers: hasCourse,
    //   studentName: req.body.studentName,
    //   studentNumber: req.body.studentNr,
    // });
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
      resterendeVakken: 0,
    });
  }
});

app.post("/coursejs", (req, res) => {
  console.log("MAGIC!", req.body);

  // Get all data from database.json file
  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);

  // check to see if studentnr is already in database.json
  let findStudNr = data.filter((value) => {
    if (
      value.studentNumber == req.body.studentNr &&
      value.studentName == req.body.studentName
    ) {
      return value;
    }
  });

  let chosen = "";

  // Determine which survey was taken
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

  // Delete completed survey from the student's survey list
  let coursesToDo = data.map((course) => {
    if (
      course.studentNumber == req.body.studentNr &&
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

  // Update users suvey progress
  let currentProgress = data.map((update) => {
    if (
      update.studentNumber == req.body.studentNr &&
      update.studentName == req.body.studentName &&
      update.hasOwnProperty("courses")
    ) {
      console.log("Update 1:", update.progress);
      update.progress = update.progress + 1;
      console.log("Update 2:", update.progress);
      return update.progress;
    }
  });

  let cleanProgress = currentProgress.filter((value) => {
    if (value != "undefined") {
      console.log("progress filtered:", value);
      return value;
    }
  });
  // // Update users suvey progress
  // data.forEach((update) => {
  //   if (
  //     update.studentNumber == req.body.studentNr &&
  //     update.studentName == req.body.studentName &&
  //     update.hasOwnProperty("courses")
  //   ) {
  //     console.log("Update 1:", update.progress);
  //     update.progress = update.progress + 1;
  //     console.log("Update 2:", update.progress);
  //   }
  // });

  // Organize user answers for storage
  let userAnswers = {
    studentName: req.body.studentName,
    studentNumber: req.body.studentNr,
    chosenCourse: req.body.chosenCourse,
    chosenTeacher: req.body.chosenTeacher,
    week: req.body.week,
    rateDifficulty: req.body.rateDifficulty,
    rateExplanation: req.body.rateExplanation,
    rateLearning: req.body.rateLearning,
  };

  // Add new user data to the array
  data.push(userAnswers);

  // Save modified data to database.json file
  let save = fs.writeFileSync(
    path.resolve("database.json"),
    JSON.stringify(data, null, 2)
  );

  // Get remaining course(s) from user
  let courseNext = data.map((nextCourse) => {
    if (
      nextCourse.studentNumber == req.body.studentNr &&
      nextCourse.studentName == req.body.studentName &&
      nextCourse.hasOwnProperty("courses")
    ) {
      for (const property in nextCourse.courses) {
        if (nextCourse.courses[property] != req.body.chosenCourse) {
          console.log(`RETURN: ${nextCourse.courses[property]}`);
          return nextCourse.courses[property];
        }
      }
    }
  });

  // console.log("Dit is it:", courseNext);
  let theCourse = courseNext.filter((value) => {
    if (value != "undefined") {
      return value;
    }
  });

  console.log("Successfully the end!");
  res.json({ nextCourse: theCourse[0], progress: cleanProgress[0] });
});

app.get("/books", (res, req) => {
  let hello = "something";
  res.send("hey there!");
});

// Redirect from survey page to profile page with localStorage
app.get("/profilejs/:studentName/:studentNr/:progress", (req, res) => {
  console.log("profile GET PAGE VIA LS");
  console.log("Requests: ", req.params);

  // Assign JSON file contents to variable
  let data = fs.readFileSync(path.resolve("database.json"));
  data = JSON.parse(data);

  // Does user input match a user's credentials in the DB?
  let userExist = data.filter((value) => {
    if (
      (value.studentName == req.params.studentName &&
        value.studentNumber == req.params.studentNr) ||
      value.studentNumber == req.params.studentNumber
    ) {
      console.log("hoe dan:", value.studentName);
      return value;
    }
  });

  console.log("CHECK USER 1", userExist.length);

  // How many courses has student completed?
  let hasCourse = userExist.filter((has) => {
    if (has.chosenCourse !== "undefined") {
      return has.chosenCourse;
    }
  });

  console.log("heeft course:", hasCourse.length);

  // Get all remaining courses from user
  let all_courses = data.map((done) => {
    if (
      done.studentName == req.params.studentName &&
      done.studentNumber == req.params.studentNr &&
      done.hasOwnProperty("courses")
    ) {
      // done.progress++;
      return done.courses;
    }
  });

  console.log("iodsfffoi", all_courses);

  // Remove undefined values from remaining survey list
  let clean = all_courses.filter((values) => {
    if (values != "undefined") {
      return values;
    }
  });

  // ======================= latest survey

  let latestUserCheck = data.filter((value) => {
    if (
      (value.studentName == req.params.studentName &&
        value.studentNumber == req.params.studentNr) ||
      value.studentNumber == req.params.studentNumber
    ) {
      console.log("hoe dan:", value.studentName);
      return value;
    }
  });

  let finishedSurvey = latestUserCheck.filter((finished) => {
    if (finished.chosenCourse !== "undefined") {
      console.log("WAT DE DEAL?", finished.chosenCourse);
      return finished.chosenCourse;
    }
  });

  // ======================= latest survey
  console.log("GAAAT HIEERRRR DOOOR NAARRRR DELETE 2");
  // Show profile page
  res.render("profile", {
    progress: req.params.progress,
    hasSurveyAnswers: finishedSurvey,
    resterendeVakken: clean[0],
    studentName: req.params.studentName,
    studentNumber: req.params.studentNr,
  });
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

  let chosen = "";

  // Determine which survey was taken
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

  // Delete completed survey from the student's survey list
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

  // Update users suvey progress
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

  let save = fs.writeFileSync(
    path.resolve("database.json"),
    JSON.stringify(data, null, 2)
  );

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
