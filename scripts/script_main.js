window.onload = setup();

function setup() {
  // Hide some UI elements
  document.querySelector(".container__timer").classList.add("none");
  document.querySelector("#button__stop").classList.add("none");
  document.querySelector("#button__pause").classList.add("none");
  document.querySelector("#button__reset").classList.add("none");

  //Add some default values
  document.querySelector("#timer__prepare").value = 10;
  document.querySelector("#timer__work").value = 20;
  document.querySelector("#timer__rest").value = 10;
  document.querySelector("#timer__cooldown").value = 30;
  document.querySelector("#cycles").value = 1;
  document.querySelector("#tabatas").value = 1;

  document.querySelector("#button__start").addEventListener("click", () => workoutTimer.start());
}

let workoutTimer = new WorkoutTimer();
let timerUI = new TimerUI(workoutTimer);