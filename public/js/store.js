let teacherEl = document.querySelectorAll('input[name="teacher"]');

console.log("yo", teacherEl);

// teacherEl.addEventListener("change", function (evt) {
//   alert("yup");
// });

teacherEl.forEach((inputEl) => {
  inputEl.addEventListener("change", function (evt) {
    alert("yup");
  });
});
