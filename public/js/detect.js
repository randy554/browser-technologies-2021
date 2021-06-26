function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

let shortNm = [
  {
    "Human Centered Design": "hcd",
    "Progressive Web Apps": "pwa",
    "CSS To The Rescue": "css",
    "Browser Technologies": "btech",
    "Real-Time Web": "realtime",
    "Web Apps From Scratch": "wafs",
  },
];

if (storageAvailable("localStorage")) {
  // Yippee! We can use localStorage awesomeness
  console.log("localStorage is available!");
  buildProfilePage();
  getUncompletedSurvey();
} else {
  // Too bad, no localStorage for us
  console.log("localStorage is not available!");
}

// Build up the profile page with DOM manipulation
function buildProfilePage() {
  // List of elements to hide
  let x = document.querySelectorAll("h2, ul, p");
  let surveyList = document.querySelector("#allSurveys").remove();
  let pageTitle = (document.querySelector("#pageTitle").innerText =
    "Overzicht enquetes");
  let toDoTitle = (document.querySelector("#toDoTitle").innerText = "Vakken");
  document.querySelector("#toDoTitle").style.fontWeight = "bold";
  // let afgerondTitle = document.querySelector("#afgerondTitle").remove();
  let afgerondTitle = document.querySelector("#afgerondTitle");
  if (afgerondTitle) {
    afgerondTitle.remove();
  }
}

// Check local storage for uncompleted survey data
function getUncompletedSurvey() {
  let uncomplete = [
    {
      enquetes: [
        {
          courseName: "Progressive Web Apps",
          shortName: "pwa",
          answers: {
            week: "Week 5",
            teacher: "Declan Rek",
            rateDifficulty: "2",
            rateExplanation: "8",
            rateLearning: "6",
          },
        },
        {
          courseName: "CSS To The Rescue",
          shortName: "css",
          answers: {
            teacher: "Vasilis van Gemert",
            rateDifficulty: "8",
            rateExplanation: "9",
            rateLearning: "8",
          },
        },
        {
          courseName: "Browser Technologies",
          shortName: "btech",
          answers: {
            week: "Week 20",
          },
        },
      ],
    },
  ];
  // let uncomplete = [
  //   {
  //     enquetes: [],
  //   },
  // ];
  // localStorage.setItem("uncomplete", JSON.stringify(uncomplete));

  // Is there is anything in localStorage
  if (localStorage.getItem("uncomplete")) {
    console.log("There are uncompleted surveys");

    // Get data from localStorage
    let check = JSON.parse(localStorage.getItem("uncomplete"));

    // Get user data from profile page
    let progressValue = document.querySelector("#getProgress").value;
    let studentNameValue = document.querySelector("#getStudentName").value;
    let studentNumberValue = document.querySelector("#getStudentNumber").value;

    // Get all uncomplete survey list from localStorage
    let survList = getSurveyList(
      check[0].enquetes,
      studentNameValue,
      studentNumberValue,
      progressValue
    );

    // Add survey list to page
    addSurveyListToPage(survList);
  } else {
    console.log(
      "There is no local storage for the project, so let's create a fresh setup"
    );
    localStorage.setItem("uncomplete", JSON.stringify(uncomplete));
  }
}

// Return a list of all uncompleted surveys in localStorage
function getSurveyList(
  localStorage,
  studentName,
  studentNumber,
  surveyProgress
) {
  let surveyList = localStorage.map((item) => {
    if (shortNm[0].hasOwnProperty(item.courseName)) {
      return {
        course: `${item.courseName}`,
        link: `/course/${
          shortNm[0][item.courseName]
        }/${studentName}/${studentNumber}/${surveyProgress}`,
      };
    }
  });

  return surveyList;
}

// Display list of uncompleted surveys on profile page
function addSurveyListToPage(surveyL) {
  let ulEl = document.querySelector("#toDoSurveys");

  surveyL.forEach((element) => {
    ulEl.insertAdjacentHTML(
      "afterbegin",
      `<li class="pendingSurveys"><a href="${element.link}"><span>&#x25cb;</span> ${element.course}</a></li>`
    );
  });
}
