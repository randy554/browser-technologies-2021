let teacherEl = document.querySelectorAll('input[name="teacher"]');
let chosenCourse = document.querySelector("#getChosenCourse").value;

// Listen & store teacher answer
teacherEl.forEach((inputEl) => {
  inputEl.addEventListener("change", function (evt) {
    // Get survey data if there is any
    // let surveyData = getSurveyData();
    let surveyData = JSON.parse(localStorage.getItem("uncomplete"));
    console.log("ALS EERST:", surveyData);

    // Are there surveys stored?
    if (surveyData[0].enquetes) {
      surveyData[0].enquetes.forEach((item, index) => {
        console.log("WATS ITEM:", item);
        // Is there local Storage data about the selected course
        // console.log("Antwoord:", evt.target.value);
        if (item.courseName == chosenCourse) {
          console.log("Vak in LS DB:", chosenCourse);

          // If teacher property exist assign new value
          if (item.answers.teacher) {
            console.log(
              "Teacher property aanwezig, met waarde:",
              item.answers.teacher
            );
            console.log("Nieuw geselecteerde waarde:", evt.target.value);
            item.answers.teacher = evt.target.value;
            // console.log("DBDB:", surveyData[index].answers.teacher);
            // surveyData[index].answers.teacher = evt.target.value;
            localStorage.setItem("uncomplete", JSON.stringify(surveyData));
            console.log("DBDB:", surveyData);
          } else {
            console.log("Docent property NIET AANWEZIG");
            item.answers.teacher = evt.target.value;
            localStorage.setItem("uncomplete", JSON.stringify(surveyData));
          }
        } else {
          console.log("Niet de gekozen vak");
        }
      });
    } else {
      console.log("no man", surveyData);
    }
  });
});
// localStorage.setItem("uncomplete", JSON.stringify(uncomplete));
// Check to see if ther is any survey data in local storage
function getSurveyData() {
  let check = JSON.parse(localStorage.getItem("uncomplete"));

  if (check) {
    console.log("er is iets!", check);
    return check[0].enquetes;
  } else {
    console.log("er is NIKS!");
    return false;
  }
}

let uncomplete = [
  {
    enquetes: [
      {
        courseName: "Progressive Web Apps",
        shortName: "pwa",
        answers: {
          week: "Week 5",
          teacher: "Declan",
          rateDifficulty: "2",
          rateExplanation: "8",
          rateLearning: "6",
        },
      },
      {
        courseName: "CSS To The Rescue",
        shortName: "css",
        answers: {
          when: "Week 15",
          teacher: "Vasilis",
          rateDifficulty: "8",
          rateExplanation: "9",
          rateLearning: "8",
        },
      },
      {
        courseName: "Browser Technologies",
        shortName: "btech",
        answers: {
          when: "Week 20",
        },
      },
    ],
  },
];
