// console.log("validate.js");

let nameField = document.querySelector("#nameStudent");
let stNrField = document.querySelector("#studentNumber");
let subMBtn = document.querySelector("[type='submit']");
let form = document.querySelector("form");
let errorEl = document.querySelector("ul");

let errorName = document.querySelector("#error_name");
let errorNumber = document.querySelector("#error_number");

nameField.addEventListener("blur", (evt) => {
  console.log("Hey, je verlaat de naam student: veld!");
  if (nameField.value === "" || nameField.value == null) {
    errorName.innerText = "Vul naam student in!";
    errorName.style.display = "block";
  } else {
    errorName.style.display = "none";
  }
});

stNrField.addEventListener("blur", (evt) => {
  console.log("Hey, je verlaat de studentnummer: veld!");

  if (stNrField.value === "" || stNrField.value == null) {
    errorNumber.innerText = "Vul studentnummer in!";
    errorNumber.style.display = "block";
  } else {
    errorNumber.style.display = "none";
  }
});

form.addEventListener("submit", (evt) => {
  let messages = [];

  if (nameField.value === "" || nameField.value == null) {
    messages.push("<li>Vul uw naam in</li>");
  }

  if (stNrField.value === "" || stNrField.value == null) {
    messages.push("<li>Vul uw studentennummer in</li>");
  }

  if (stNrField.value !== "" || stNrField.value != null) {
    // console.log("TYPEOF: ", typeof stNrField.value);

    let studNr = Number(stNrField.value);
    // console.log("TYPEOF 2: ", typeof studNr, " value: ", studNr);

    if (isNaN(studNr)) {
      messages.push("<li>Studentnummer bestaat alleen uit cijfers!</li>");
    }

    if (stNrField.value.length !== 9) {
      messages.push("<li>Studentnummer is 9 cijfers lang!</li>");
    }
  }

  if (messages.length > 0) {
    evt.preventDefault();
    errorEl.innerHTML = messages.join("");
  }
});
