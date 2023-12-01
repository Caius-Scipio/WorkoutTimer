class WorkoutTimer {
  constructor() {
    this.currentPhase = "Prepare";
    this.paused = false;
    this.workSound = new Audio("./sound/Work.m4a");
    this.restSound = new Audio("./sound/Rest.m4a");
    this.cooldownSound = new Audio("./sound/Cooldown.m4a");
  }
  start() {
    this.clearTimerInterval();
    this.paused = false;

    // Get duration and cycle information for the timer
    this.prepareTime = Math.abs(parseInt(document.getElementById("timer__prepare").value));
    this.workTime = Math.abs(parseInt(document.getElementById("timer__work").value));
    this.restTime = Math.abs(parseInt(document.getElementById("timer__rest").value));
    this.cooldownTime = Math.abs(parseInt(document.getElementById("timer__cooldown").value));
    this.initialCycles = Math.abs(parseInt(document.getElementById("cycles").value));
    this.cycles = this.initialCycles;
    this.tabatas = Math.abs(parseInt(document.getElementById("tabatas").value));

    this.currentPhase = "Prepare";
    this.currentTime = this.prepareTime;
    timerUI.updateDisplayPhase(this.currentPhase);
    this.timerTick(this.currentTime, this.currentPhase);
    timerUI.updateButtons(this.currentPhase);
    this.prepareSound.currentTime = 0;
    this.prepareSound.volume = 0.7;
    this.prepareSound.play();
  }
  stop() {
    this.clearTimerInterval();
    this.paused = true;
    timerUI.updateDisplay(0, "Workout Stopped");
    timerUI.updateDisplayPhase("Workout Stopped");
  }
  pause() {
    this.paused = !this.paused;
    // if (this.paused) {
    //   this.clearTimerInterval();
    // }
  }
  reset() {
    this.clearTimerInterval();
    this.paused = true;
    // Restore the defaults
    document.getElementById("timer__prepare").value = 10;
    document.getElementById("timer__work").value = 20;
    document.getElementById("timer__rest").value = 10;
    document.getElementById("timer__cooldown").value = 30;
    document.getElementById("cycles").value = 1;
    document.getElementById("tabatas").value = 1;

    timerUI.updateDisplay(0, "Workout Reset");
    timerUI.updateButtons("Workout Reset");
  }
  timerTick(currentTime, currentPhase) {
    // The timer
    timerUI.updateDisplay(currentTime, currentPhase);
    let count;

    const tick = () => {
      if (!this.paused) {
        currentTime--;
        timerUI.updateDisplay(currentTime, currentPhase);
        if (currentTime < 0) {
          clearInterval(count);
          this.nextPhase(currentTime, count);
        }
      }
    };

    count = setInterval(tick, 1000);

    this.timerIntervalId = count;
  }
  formatTime(currentTime) {
    // Format the time as MM:SS
    currentTime = Math.max(0, currentTime);
    const minutes = Math.floor(currentTime / 60);
    const remainingSeconds = currentTime % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  nextPhase(currentTime, count) {
    // This part controls the oder of the work, rest, cooldown cycles

    clearInterval(count);
    // Cycles between the work and rest cycles
    if (this.currentPhase === "Prepare") {
      currentTime = this.workTime;
      this.currentPhase = "Work";
      this.workSound.play();
    }
    else if (this.currentPhase === "Work") {
      currentTime = this.restTime;
      this.currentPhase = "Rest";
      this.restSound.play();
    }
    else if (this.currentPhase === "Rest") {
      currentTime = this.workTime;
      this.currentPhase = "Work";
      this.cycles--;

      document.getElementById("cycles").value = this.cycles;
      // Check if all cycles are completed
      if (this.cycles > 0) {
        this.workSound.play();
      }
      else if (this.cycles === 0) {
        this.currentPhase = "Cooldown";
        currentTime = this.cooldownTime;
        this.cooldownSound.play();
      }
    }
      // Do a cooldown phase
    else if (this.currentPhase === "Cooldown") {
      this.tabatas--;
      document.getElementById("tabatas").value = this.tabatas;
      // Check if there are more Tabatas
      if (this.tabatas > 0) {
        this.cycles = this.initialCycles;
        document.getElementById("cycles").value = this.cycles;
        this.currentPhase = "Work";
        currentTime = this.workTime;
      }
      // All Tabatas are completed
      else {
        currentTime = 0;
        this.currentPhase = "Workout Complete";
      }
    }

    timerUI.updateDisplay(currentTime, this.currentPhase);
    timerUI.updateDisplayPhase(this.currentPhase);
    timerUI.updateButtons(this.currentPhase);
    this.timerTick(currentTime, this.currentPhase);
  }
  clearTimerInterval() {
    clearInterval(this.timerIntervalId);
  }
}