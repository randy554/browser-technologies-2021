let showSection = document.querySelector("#progressSection");
let showSectionFunc = document.querySelector("#progressSectionFunc");
showSection.style.display = "flex";
showSectionFunc.style.display = "none";

window.addEventListener("load", () => {
  let progBar = document.querySelector("#myBar");
  let progDB = document.querySelector(
    "#hiddenProgress > input[name='progressValue']"
  ).value;
  let progDBfrmPost = document.querySelector(
    "form input[name='progressValue']"
  ).value;

  console.log(`Progressbar: ${progBar} - Progress from DB: ${progDB}`);

  if (progDB == 0 || progDBfrmPost == 0) {
    progBar.style.width = "0%";
    progBar.textContent = "0%";
  } else if (progDB == 1 || progDBfrmPost == 1) {
    progBar.style.width = "16.6666666667%";
    progBar.textContent = "17%";
  } else if (progDB == 2 || progDBfrmPost == 2) {
    progBar.style.width = "33.3333333334%";
    progBar.textContent = "33%";
  } else if (progDB == 3 || progDBfrmPost == 3) {
    progBar.style.width = "50.0000000001%";
    progBar.textContent = "50%";
  } else if (progDB == 4 || progDBfrmPost == 4) {
    progBar.style.width = "66.6666666668%";
    progBar.textContent = "67%";
  } else if (progDB == 5 || progDBfrmPost == 5) {
    progBar.style.width = "83.3333333335%";
    progBar.textContent = "83%";
  } else if (progDB >= 6 || progDBfrmPost >= 6) {
    progBar.style.width = "100%";
    progBar.textContent = "100%";
  }
});
