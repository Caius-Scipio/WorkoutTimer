class TimerUI {
  constructor(workoutTimer) {
    this.workoutTimer = workoutTimer;

    // Query Buttons
    this.startButton = document.getElementById("button__start");
    this.pauseButton = document.getElementById("button__pause");
    this.stopButton = document.getElementById("button__stop");
    this.resetButton = document.getElementById("button__reset");

    //Adding event listeners
    this.startButton.addEventListener("click", () => workoutTimer.start());
    this.pauseButton.addEventListener("click", () => workoutTimer.pause());
    this.stopButton.addEventListener("click", () => workoutTimer.stop());
    this.resetButton.addEventListener("click", () => workoutTimer.reset());

    // //Set initial Display
    // let display = document.getElementById("timer");
    // display.innerHTML = "00:00";
  }
  updateDisplay(currentTime, currentPhase) {
    // Update the display
    if (currentPhase === "Workout Complete" || currentPhase === "Workout Reset") {
      document.getElementById("timer").innerText = `${currentPhase}`;
      document.querySelector(".container__prepare").classList.remove("none");
      document.querySelector(".container__work").classList.remove("none");
      document.querySelector(".container__rest").classList.remove("none");
      document.querySelector(".container__cooldown").classList.remove("none");
      document.querySelector(".container__timer").classList.add("none");
      document.querySelector("#cycles").disabled = false;
      document.querySelector("#tabatas").disabled = false;
    }
    else {
      document.getElementById("timer").innerText = `${currentPhase}: ${this.workoutTimer.formatTime(currentTime)}`;
      document.querySelector(".container__prepare").classList.add("none");
      document.querySelector(".container__work").classList.add("none");
      document.querySelector(".container__rest").classList.add("none");
      document.querySelector(".container__cooldown").classList.add("none");
      document.querySelector(".container__timer").classList.remove("none");
      document.querySelector("#cycles").disabled = true;
      document.querySelector("#tabatas").disabled = true;
    }
  }
  updateDisplayPhase(currentPhase) {
    const containerTimer = document.getElementsByClassName("container__timer")[0];

    // Remove all existing classes
    containerTimer.classList.remove("amber", "green", "red", "blue", "gray", "blinkGreen", "blinkRed");

    // Add the appropriate class based on the current phase
    switch (currentPhase) {
      case "Prepare":
        containerTimer.classList.add("amber");
        break;
      case "Work":
        containerTimer.classList.add("blinkGreen");
        break;
      case "Rest":
        containerTimer.classList.add("blinkRed");
        break;
      case "Cooldown":
        containerTimer.classList.add("blue");
        break;
      case "Workout Stopped":
        containerTimer.classList.add("gray");
        break;
      default:
        containerTimer.classList.add("gray");
        break;
    }
  }
  updateButtons(currentPhase) {
    if (currentPhase === "Prepare") {
      this.startButton.classList.add("none");
      this.stopButton.classList.remove("none");
      this.pauseButton.classList.remove("none");
      this.resetButton.classList.remove("none");
    }
    if (currentPhase === "Workout Reset" || currentPhase === "Workout Complete") {
      this.startButton.classList.remove("none");
      this.stopButton.classList.add("none");
      this.pauseButton.classList.add("none");
      this.resetButton.classList.add("none");
    }
  }
}