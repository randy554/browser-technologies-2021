let chosenCourse = document.querySelector("#getChosenCourse").value;

// Form input
let teacherEl = document.querySelectorAll('input[name="teacher"]');
let periodEl = document.querySelectorAll('input[name="week"]');

// Rating input
let difficultyEl = document.querySelector('input[name="rateDifficulty"]');
let explanationEl = document.querySelector('input[name="rateExplanation"]');
let learningEl = document.querySelector('input[name="rateLearning"]');

// Submit btn
let submitBtn = document.querySelector(['input[type="submit"]']);

// List with
let formInputFields = [
  teacherEl,
  periodEl,
  difficultyEl,
  explanationEl,
  learningEl,
];

// Initialise temporary storage for all form answers
let tempDB = tempStorage();

// Listen & store teacher answer
teacherEl.forEach((inputEl) => {
  inputEl.addEventListener("change", function (evt) {
    // Get survey data if there is any
    let allData = getSurveyData();

    // Are there surveys stored?
    if (allData[0].enquetes) {
      allData[0].enquetes.forEach((item) => {
        // Is there local Storage data about the selected course
        if (item.courseName == chosenCourse) {
          // If property exist in LS, assign new value
          if (item.answers.teacher) {
            console.log(
              "Teacher property aanwezig, met waarde:",
              item.answers.teacher
            );
            console.log("Nieuw geselecteerde waarde:", evt.target.value);
            item.answers.teacher = evt.target.value;
            localStorage.setItem("uncomplete", JSON.stringify(allData));
            // Store in memoryDB
            tempDB.teacher = evt.target.value;
            console.log("DBDB:", allData);
          } else {
            console.log("Docent property NIET AANWEZIG");
            item.answers.teacher = evt.target.value;
            localStorage.setItem("uncomplete", JSON.stringify(allData));
            // Store in memoryDB
            tempDB.teacher = evt.target.value;
          }
        } else {
          console.log("Niet de gekozen vak");
        }
      });
    } else {
      console.log("no man", allData);
    }
  });
});

// Liston to & store period answer
periodEl.forEach((inputEl) => {
  inputEl.addEventListener("change", function (evt) {
    // Get data from local storage
    let allData = getSurveyData();

    // Are there surveys stored?
    if (allData[0].enquetes) {
      // Go though all the surveys stored
      allData[0].enquetes.forEach((item) => {
        // Is there local Storage data about the selected course
        if (item.courseName == chosenCourse) {
          // If property exist in LS, assign new value
          if (item.answers[evt.target.name]) {
            // Update week property with new value
            item.answers[evt.target.name] = evt.target.value;
            localStorage.setItem("uncomplete", JSON.stringify(allData));
            // Store in memoryDB
            tempDB[evt.target.name] = evt.target.value;
          } else {
            // Add new property & value to local storage object
            item.answers[evt.target.name] = evt.target.value;
            localStorage.setItem("uncomplete", JSON.stringify(allData));
            // Store in memoryDB
            tempDB[evt.target.name] = evt.target.value;
          }
        } else {
          console.log("No survey data for chosen course:", chosenCourse);
        }
      });
    } else {
      console.log("No survey data in local storage");
    }
  });
});

// localStorage.setItem("uncomplete", JSON.stringify(uncomplete));
// Check to see if ther is any survey data in local storage
function getSurveyData() {
  let check = JSON.parse(localStorage.getItem("uncomplete"));

  if (check) {
    console.log("er is iets!", check);
    return check;
  } else {
    console.log("er is NIKS!");
    return false;
  }
}

submitBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  console.log("DB memory status:", tempDB);
});

function tempStorage() {
  let tempStore = {};
  return tempStorage;
}

function storeValue(evt) {
  // Get data from local storage
  let surveyData = JSON.parse(localStorage.getItem("uncomplete"));

  // Are there surveys stored?
  if (surveyData[0].enquetes) {
    console.log("Data in local storage");

    // Go though all the surveys stored
    surveyData[0].enquetes.forEach((item) => {
      // If current survey course found in local storage
      if (chosenCourse == item.courseName) {
        // If input property exist in local storage
        // update value
        if (item.answers[evt.target.name]) {
          // Update week property with new value
          item.answers[evt.target.name] = evt.target.value;
          localStorage.setItem("uncomplete", JSON.stringify(surveyData));
          // Store in memoryDB
          tempDB[evt.target.name] = evt.target.value;
        } else {
          // Update week property with new value
          item.answers[evt.target.name] = evt.target.value;
          localStorage.setItem("uncomplete", JSON.stringify(surveyData));
          // Store in memoryDB
          tempDB[evt.target.name] = evt.target.value;
        }
      }
    });
  } else {
    console.log("No data in local storage");
  }
}

difficultyEl.addEventListener("change", storeValue);
explanationEl.addEventListener("change", storeValue);
learningEl.addEventListener("change", storeValue);

// Get stored values from LS based on course
function getTempValuesFromLs(course) {
  let surveyData = JSON.parse(localStorage.getItem("uncomplete"));

  // Are there surveys stored?
  if (surveyData[0].enquetes) {
    return surveyData[0].enquetes.filter((surveyData) => {
      if (course == surveyData.courseName) {
        return surveyData.courseName;
      }
    });
  } else {
    return false;
  }
}

if (getTempValuesFromLs(chosenCourse)) {
  console.log("READY for input", getTempValuesFromLs(chosenCourse));
  const lsTempData = getTempValuesFromLs(chosenCourse);

  // Go through all input fields on page
  formInputFields.forEach((element, i) => {
    console.log("BOSS:", element.length);
    if (element.length >= 1) {
      element.forEach((nodeListItem) => {
        console.log("A nodelist item:", nodeListItem);
        if (lsTempData[0].answers.hasOwnProperty(nodeListItem.name)) {
          if (nodeListItem.value == lsTempData[0].answers[nodeListItem.name]) {
            nodeListItem.checked = true;
          }
        }
      });
    } else if (element.name) {
      if (lsTempData[0].answers.hasOwnProperty(element.name)) {
        element.value = lsTempData[0].answers[element.name];
      }
    }
  });
} else {
  console.log("No survey DATA in local storage for input");
}
