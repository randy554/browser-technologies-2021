let chosenCourse = document.querySelector("#getChosenCourse").value;
let loaderBlock = document.querySelector(".loader_block");
let formEl = document.querySelectorAll("label, input");

// Form input
let formAction = document.querySelector("#formAction");
let teacherEl = document.querySelectorAll('input[name="teacher"]');
let periodEl = document.querySelectorAll('input[name="week"]');

// Hidden input
let progress = document.querySelector('input[name="progressValue"]').value;
let studentNumber = document.querySelector('input[name="studentNumber"]').value;
let studentName = document.querySelector('input[name="studentName"]').value;
let profileBlock = document.querySelector("#profileblock");

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
    if (allData.status) {
      if (getTempValuesFromLs(chosenCourse).length > 0) {
        // Go though all the surveys stored
        allData.data[0].enquetes.forEach((item) => {
          // console.log(
          //   `DOCENTEN ITEM COURSE: ${item.courseName} - chosen course: ${chosenCourse}`
          // );

          // Is there local Storage data about the selected course
          if (item.courseName == chosenCourse) {
            // If property exist in LS, assign new value
            if (item.answers[evt.target.name]) {
              // Update property with new value
              item.answers[evt.target.name] = evt.target.value;
              localStorage.setItem("uncomplete", JSON.stringify(allData.data));
              // Store in memoryDB
              tempDB[evt.target.name] = evt.target.value;
              console.log("DBDB:", allData.data);
            } else {
              console.log("Docent property NIET AANWEZIG");
              item.answers[evt.target.name] = evt.target.value;
              localStorage.setItem("uncomplete", JSON.stringify(allData.data));
              // Store in memoryDB
              tempDB[evt.target.name] = evt.target.value;
            }
          } else {
            console.log("Niet de gekozen vak");
            // allData.data[0].enquetes.push({
            //   courseName: chosenCourse,
            //   answers: { teacher: evt.target.value },
            // });
            // localStorage.setItem("uncomplete", JSON.stringify(allData.data));
          }
        });
      } else {
        allData.data[0].enquetes.push({
          courseName: chosenCourse,
          answers: { teacher: evt.target.value },
        });
        localStorage.setItem("uncomplete", JSON.stringify(allData.data));
      }
    } else {
      console.log("No survey data in local storage");
      let freshDB = allData.data;
      console.log("eeeeYYY", freshDB[0].enquetes);
      freshDB[0].enquetes.push({
        courseName: chosenCourse,
        answers: { teacher: evt.target.value },
      });
      localStorage.setItem("uncomplete", JSON.stringify(freshDB));
    }
  });
});

// Liston to & store period answer
periodEl.forEach((inputEl) => {
  inputEl.addEventListener("change", function (evt) {
    // Get data from local storage
    let allData = getSurveyData();

    console.log("SHOW ME THE MONEY!", allData.data[0]);
    // Are there surveys stored?
    if (allData.status) {
      if (getTempValuesFromLs(chosenCourse).length > 0) {
        // Go though all the surveys stored
        allData.data[0].enquetes.forEach((item) => {
          // Is there local Storage data about the selected course

          if (item.courseName == chosenCourse) {
            // If property exist in LS, assign new value
            console.log("INSIDE LIFE!:", evt.target.name);
            if (item.answers[evt.target.name]) {
              console.log("EINSTEIN:", item.answers[evt.target.name]);
              // Update week property with new value
              item.answers[evt.target.name] = evt.target.value;
              localStorage.setItem("uncomplete", JSON.stringify(allData.data));
              // Store in memoryDB
              tempDB[evt.target.name] = evt.target.value;
            } else {
              // Add new property & value to local storage object
              item.answers[evt.target.name] = evt.target.value;
              localStorage.setItem("uncomplete", JSON.stringify(allData.data));
              // Store in memoryDB
              tempDB[evt.target.name] = evt.target.value;
            }
          } else {
            console.log("No survey data for chosen course:", chosenCourse);
            // allData.data[0].enquetes.push({
            //   courseName: chosenCourse,
            //   answers: { week: evt.target.value },
            // });
            // localStorage.setItem("uncomplete", JSON.stringify(allData.data));
          }
        });
      } else {
        allData.data[0].enquetes.push({
          courseName: chosenCourse,
          answers: { week: evt.target.value },
        });
        localStorage.setItem("uncomplete", JSON.stringify(allData.data));
      }
    } else {
      console.log("No survey data in local storage");
      let freshDB = allData.data;
      console.log("yoooOO", freshDB[0].enquetes);
      freshDB[0].enquetes.push({
        courseName: chosenCourse,
        answers: { week: evt.target.value },
      });
      localStorage.setItem("uncomplete", JSON.stringify(freshDB));
    }
  });
});

// localStorage.setItem("uncomplete", JSON.stringify(uncomplete));
// Check to see if ther is any survey data in local storage
function getSurveyData() {
  let check = JSON.parse(localStorage.getItem("uncomplete"));

  if (check) {
    console.log("er is iets!", check);

    // Is there any data in de survey section?
    if (check[0].enquetes.length > 0) {
      return { status: true, data: check };
    } else {
      return { status: false, data: check };
    }
  } else {
    console.log("er is helemaal niks in LS!");
    return false;
  }
}
// Create a backlink to profile page
// & add it to the page
function createLinkToProfilePage(rootElement) {
  // Create link to profile page here: Terug naar overzicht
  let profileLink = document.createElement("a");
  profileLink.innerText = "Terug naar het overzicht";

  // Get request
  profileLink.setAttribute(
    "href",
    `/profilejs/${studentName}/${studentNumber}/${progress}`
  );

  let br = document.createElement("br");
  let anotherBr = document.createElement("br");

  // Position created elements on page
  rootElement.insertAdjacentElement("afterbegin", profileLink);
  rootElement.insertAdjacentElement("afterbegin", br);
  rootElement.insertAdjacentElement("afterbegin", anotherBr);
}

createLinkToProfilePage(profileBlock);

// Erase all error messages from page
formEl.forEach((inputEl) => {
  inputEl.addEventListener("click", function (evt) {
    console.log("klik hier:", evt.target.id);
    if (document.querySelector("#errorPar")) {
      console.log("its here");
      let errorObj = document.querySelector("#errorPar");
      errorObj.remove();
    } else if (evt.target.id == "difficulty") {
      console.log("its here difficultyError");
      difficultyError.style.display = "none";
    } else if (evt.target.id == "explanation") {
      console.log("its here explanationError");
      explanationError.style.display = "none";
    } else if (evt.target.id == "learned") {
      console.log("its here learnedError");
      learnedError.style.display = "none";
    }
  });
});

let messages = [];

// When user submits form
submitBtn.addEventListener("click", function (evt) {
  if (window.fetch) {
    console.log("Fetch feature detected!");

    evt.preventDefault();
    messages = [];
    let inputErr = [];

    let teacherCheck = document.querySelector('input[name="teacher"]:checked');

    if (!teacherCheck) {
      messages.push("Vul alle velden in!");
    }
    let weekCheck = document.querySelector('input[name="week"]:checked');

    if (!weekCheck) {
      messages.push("Vul alle velden in!");
    }

    let difficultyError = document.querySelector("#difficultyError");

    // console.log("difficulty:", difficultyEl.value);
    // Check for difficulty question input
    if (difficultyEl.value == "" || difficultyEl == null) {
      messages.push("Antwoord alle vragen juist!");
    } else if (difficultyEl.value > 10) {
      inputErr.push("Antwoord kan niet groter dan 10 zijn!");
      difficultyError.innerText = "Antwoord kan niet groter dan 10 zijn!";
      difficultyError.style.display = "block";
    } else if (difficultyEl.value < 1) {
      inputErr.push("Antwoord kan niet minder zijn dan 1!");
      difficultyError.innerText = "Antwoord kan niet minder zijn dan 1!";
      difficultyError.style.display = "block";
    } else if (isNaN(difficultyEl.value)) {
      console.log("Alleen cijfers zijn toegestaan!");
    }

    let explanationError = document.querySelector("#explanationError");

    // console.log("explanation:", explanationEl.value);
    // Check for explanation question input
    if (explanationEl.value == "" || explanationEl == null) {
      messages.push("Antwoord alle vragen juist!");
    } else if (explanationEl.value > 10) {
      inputErr.push("Antwoord kan niet groter dan 10 zijn!");
      explanationError.innerText = "Antwoord kan niet groter dan 10 zijn!";
      explanationError.style.display = "block";
    } else if (explanationEl.value < 1) {
      inputErr.push("Antwoord kan niet minder zijn dan 1!");
      explanationError.innerText = "Antwoord kan niet minder zijn dan 1!";
      explanationError.style.display = "block";
    } else if (isNaN(explanationEl.value)) {
      console.log("Alleen cijfers zijn toegestaan!");
    }

    let learnedError = document.querySelector("#learnedError");

    // console.log("learning:", learningEl.value);
    // Check for learning question input
    // if (learningEl.value == "" || learningEl == null) {
    //   messages.push("Make sure to answer all questions!");
    // } else if (learningEl.value > 10) {
    //   inputErr.push("Input must be smaller than 10!");
    //   // Show error on page
    //   learnedError.innerText = "Input must be smaller than 10!";
    //   learnedError.style.display = "block";
    // } else if (learningEl.value < 1) {
    //   inputErr.push("Input must be bigger than 1!");
    //   // Show error on page
    //   learnedError.innerText = "Input must be bigger than 1!";
    //   learnedError.style.display = "block";
    // } else if (isNaN(learningEl.value)) {
    //   console.log("Only numbers allowd in field!");
    // }

    if (learningEl.value == "" || learningEl == null) {
      messages.push("Antwoord alle vragen juist!");
    } else if (learningEl.value > 10) {
      inputErr.push("Antwoord kan niet groter dan 10 zijn!");
      // Show error on page
      learnedError.innerText = "Antwoord kan niet groter dan 10 zijn!";
      learnedError.style.display = "block";
    } else if (learningEl.value < 1) {
      inputErr.push("Antwoord kan niet minder zijn dan 1!");
      // Show error on page
      learnedError.innerText = "Antwoord kan niet minder zijn dan 1!";
      learnedError.style.display = "block";
    } else if (isNaN(learningEl.value)) {
      console.log("Alleen cijfers zijn toegestaan!");
    }

    if (messages.length > 0) {
      console.log("Vul alle velden in!");
      console.log(messages);

      let errorBox = document.getElementById("error_box");
      let errorPar = document.createElement("p");
      errorPar.innerText = messages[0];
      errorPar.setAttribute("id", "errorPar");
      errorBox.insertAdjacentElement("afterbegin", errorPar);
    } else if (inputErr.length > 0) {
      console.log("Invalid input");
      console.log(inputErr);
    } else {
      console.log("Prima! Alle velden zijn gevuld.");
      // Display loading animation
      toggleLoader("on");

      // Get filled input values
      const teacherVal = document.querySelector(
        'input[name="teacher"]:checked'
      ).value;

      const periodVal = document.querySelector(
        'input[name="week"]:checked'
      ).value;

      const difficultyVal = document.querySelector(
        'input[name="rateDifficulty"]'
      ).value;
      const explanationVal = document.querySelector(
        'input[name="rateExplanation"]'
      ).value;
      const learningVal = document.querySelector(
        'input[name="rateLearning"]'
      ).value;

      // Retrieved form data
      const data = {
        studentName: studentName,
        studentNr: studentNumber,
        progress: progress,
        chosenCourse: chosenCourse,
        chosenTeacher: teacherVal,
        week: periodVal,
        rateDifficulty: difficultyVal,
        rateExplanation: explanationVal,
        rateLearning: learningVal,
      };

      // Create next course to be taken button
      function createNextSurveyElements(
        rootElement,
        courseName,
        currentSubmitBn
      ) {
        // Remove checkMark
        toggleCheckMark("off");
        // Remove current submit button from block
        currentSubmitBn.style.display = "none";

        // Create button & set attributes
        let input = document.createElement("input");
        input.setAttribute("type", "submit");
        input.setAttribute("class", "nextSurveyBtn");
        input.setAttribute("value", courseName);

        // Change chosen course value
        // chosenCourse = courseName;

        let newChosenCourse = document.querySelector("#getChosenCourse");
        newChosenCourse.value = courseName;
        console.log("Dit is nu de chosen:", newChosenCourse);

        // Create description text: Volgende enquete?
        let text = document.createElement("p");
        text.innerText = "Volgende enquete?";
        let br = document.createElement("br");
        let anotherBr = document.createElement("br");

        // Create link to profile page here: Terug naar overzicht
        let link = document.createElement("a");
        link.innerText = "Terug naar het overzicht";

        // Change the form action attribute
        formAction.setAttribute("action", "/nextcoursejs");

        // Get request
        link.setAttribute(
          "href",
          `/profilejs/${studentName}/${studentNumber}/${++progress}`
        );

        // Remove duplicate backlink to profilepage
        profileBlock.remove();

        // Position created elements on page
        rootElement.insertAdjacentElement("afterend", link);
        rootElement.insertAdjacentElement("afterend", br);
        rootElement.insertAdjacentElement("afterend", anotherBr);
        rootElement.insertAdjacentElement("afterend", input);
        rootElement.insertAdjacentElement("afterend", text);
      }

      // Create next course to be taken button
      function endSurveyElements(rootElement, courseName, currentSubmitBn) {
        // Remove checkMark
        toggleCheckMark("off");
        // Remove current submit button from block
        currentSubmitBn.style.display = "none";

        // // Create button & set attributes
        // let input = document.createElement("input");
        // input.setAttribute("type", "submit");
        // input.setAttribute("class", "nextSurveyBtn");
        // input.setAttribute("value", courseName);

        // Change chosen course value
        chosenCourse = courseName;

        let newChosenCourse = document.querySelector("#getChosenCourse");
        newChosenCourse.value = courseName;
        console.log("Dit is nu de chosen:", newChosenCourse);

        // Create description text: Volgende enquete?
        let text = document.createElement("p");
        text.innerText = "Volgende enquete?";
        let br = document.createElement("br");
        let anotherBr = document.createElement("br");

        // Create link to profile page here: Terug naar overzicht
        let link = document.createElement("a");
        link.innerText = "Terug naar het overzicht";

        // Change the form action attribute
        formAction.setAttribute("action", "/nextcoursejs");

        // Get request
        link.setAttribute(
          "href",
          `/profilejs/${studentName}/${studentNumber}/6`
        );

        // Remove duplicate backlink to profilepage
        profileBlock.remove();

        // Position created elements on page
        rootElement.insertAdjacentElement("afterend", link);
        rootElement.insertAdjacentElement("afterend", br);
        rootElement.insertAdjacentElement("afterend", anotherBr);
        // rootElement.insertAdjacentElement("afterend", input);
        // rootElement.insertAdjacentElement("afterend", text);
      }

      // Fetch options
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      // Send form data to backend
      fetch("/coursejs", options)
        .then((res) => {
          // console.log(res.json());

          // Display loading animation
          toggleLoader("off");

          // Display checkmark icon
          toggleCheckMark("on");
          return res.json();
        })
        .then((nextCourse) => {
          console.log("This is the final then:");
          console.log(nextCourse);
          console.log("Course(s) finished:", nextCourse.progress);
          let courseTodo = nextCourse.nextCourse;
          console.log("Next course todo: ", courseTodo);

          if (nextCourse.nextCourse != "undefined") {
            if (nextCourse.progress == 6) {
              endSurveyElements(loaderBlock, courseTodo, submitBtn);
            } else {
              createNextSurveyElements(loaderBlock, courseTodo, submitBtn);
            }
          }
        });

      // Delete survey from localStorage
      deleteSurveyDataFromLs(chosenCourse);
      console.log("Data sent to server:", data);
    }
  } else {
    console.log("No fetch feature detected!");
  }
});

function tempStorage() {
  let tempStore = {};
  return tempStore;
}

function storeValue(evt) {
  // Get data from local storage
  let surveyData = JSON.parse(localStorage.getItem("uncomplete"));
  // console.log("AJAX", surveyData);

  // Are there surveys stored?
  if (surveyData[0].enquetes) {
    // console.log("Data in local storage");

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

// Remove course survey data from localStorage
function deleteSurveyDataFromLs(course) {
  // Get localStorage survey data
  let surveyData = JSON.parse(localStorage.getItem("uncomplete"));

  console.log("DB voor delete:", surveyData);

  // Create new survey list without selected course
  if (surveyData[0].enquetes) {
    let deletedSurveyList = surveyData[0].enquetes.filter((item) => {
      if (item.courseName != course) {
        return item;
      }
    });
    console.log("DB na delete:", deletedSurveyList);
    // Save new list to localStorage
    surveyData[0].enquetes = deletedSurveyList;
    localStorage.setItem("uncomplete", JSON.stringify(surveyData));
  }
}

// Are there any temporal survey data in localStorage?
if (getTempValuesFromLs(chosenCourse).length > 0) {
  // Assign variable to work with survey data from localStorage
  const lsTempData = getTempValuesFromLs(chosenCourse);

  console.log("Aantal VAKKEN:", lsTempData);

  // Go through all input fields on page
  formInputFields.forEach((element) => {
    console.log("BOSS:", element.length);
    // If there is more than one input type + same name,
    if (element.length >= 1) {
      // loop throug the input elements
      element.forEach((nodeListItem) => {
        console.log("A nodelist item:", nodeListItem);
        // If the current element: input[name='?'] can be found in localStorage
        // as a property in the answers object section
        if (lsTempData[0].answers.hasOwnProperty(nodeListItem.name)) {
          // If the current element: input[value='?'] matches the property value
          // in localStorage, then mark input element as true
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

function toggleLoader(state) {
  if (state === "on") {
    document.querySelector(".loader").style.display = "flex";
  } else if (state === "off") {
    document.querySelector(".loader").style.display = "none";
  }
}

function toggleCheckMark(state) {
  if (state === "on") {
    document.querySelector(".check_mark").style.display = "flex";
  } else if (state === "off") {
    document.querySelector(".check_mark").style.display = "none";
  }
}
