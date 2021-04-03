// console.log("validate.js");

let nameField = document.querySelector("#nameStudent");
let stNrField = document.querySelector("#studentNumber");
let subMBtn = document.querySelector("[type='submit']");
let form = document.querySelector("form");
let errorEl = document.querySelector("ul");

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
