class StopWatch {
    start;
    mseconds;
    seconds;
    interval;
    passedtime;
    lap_container;
    lap;
    constructor(_timer, lap_container) {
        this.timer = _timer;
        this.mseconds = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.passedtime = 0;
        this.lap_container = lap_container
        this.lap = 1;
        this.initiateTimer();
    }

    initiateTimer() {
        this.timer.innerHTML = `<p class="time">00 : 00 . 00</p>`
    }

    startStopWatch() {
        this.start = Date.now();
        this.interval = setInterval(() => {
            this.calculateTime();
            this.timer.innerHTML = `<p class="time">${this.castTimeString(this.minutes)} : ${this.castTimeString(this.seconds)} . ${this.castTimeString(this.mseconds)}</p>`
        }, 1);
    }

    stopStopWatch() {
        this.passedtime = this.calculateTime();
        clearInterval(this.interval);
        console.log(this.calculateTime())
    }

    resetStopWatch() {
        this.start = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.lap = 1;
        clearInterval(this.interval);
        this.timer.innerHTML = this.timer.innerHTML = `<p class="time" > 00 : 00 . 00 </p>`
        this.lap_container.innerHTML = '';
    }
    calculateTime() {
        var current = Date.now();
        var passedTime = (current - this.start);
        this.mseconds = passedTime;
        if (this.mseconds >= 999) {
            this.seconds++;
            this.start = Date.now();
        }
        if (this.seconds >= 59) {
            this.seconds = 0;
            this.minutes++;
        }
        return passedTime
    }
    castTimeString(intNumber) {
        var stringNumber = intNumber.toString();
        stringNumber = stringNumber.substring(0, 2)
        return stringNumber.padStart(2, '0');

    }
    resumeTimer() {
        this.start = Date.now() - this.passedtime;
        this.interval = setInterval(() => {
            this.calculateTime();
            this.timer.innerHTML = `<p class="time" > ${ this.castTimeString(this.minutes) } : ${ this.castTimeString(this.seconds) } . ${ this.castTimeString(this.mseconds) } </p>`
        }, 1);
    }
    addLap() {
        this.lap_container.innerHTML += `<article class="lap-container"><p class="lap-title">Lap ${this.lap}</p><p class="lap-timing">${this.castTimeString(this.minutes)} : ${this.castTimeString(this.seconds)} . ${this.castTimeString(this.mseconds)}</p></article>`
        this.lap++;
    }
}


var startBtn = document.querySelector('.start');
var resetBtn = document.querySelector('.reset');
var resumeBtn = document.querySelector('.resume');
var stopBtn = document.querySelector('.stop');
var lapBtn = document.querySelector('.lap');
var timer = document.querySelector('.timer-container');
var laps = document.querySelector('.laps-container');

const stopWatch = new StopWatch(timer, laps);


startBtn.addEventListener('click', function() {
    stopWatch.startStopWatch();
    startBtn.classList.add('hideButton');
    stopBtn.classList.remove('hideButton');
    lapBtn.classList.remove('hideButton');

})
resetBtn.addEventListener('click', function() {
    stopWatch.resetStopWatch();
    startBtn.classList.remove('hideButton');
    resetBtn.classList.add('hideButton');
    resumeBtn.classList.add('hideButton');
})
stopBtn.addEventListener('click', function() {
    stopWatch.stopStopWatch();
    stopBtn.classList.add('hideButton');
    lapBtn.classList.add('hideButton');
    resumeBtn.classList.remove('hideButton');
    resetBtn.classList.remove('hideButton');
})
lapBtn.addEventListener('click', function() {
    stopWatch.addLap(laps);

})
resumeBtn.addEventListener('click', function() {
    stopWatch.resumeTimer();
    resumeBtn.classList.add('hideButton');
    resetBtn.classList.add('hideButton');
    stopBtn.classList.remove('hideButton');
    lapBtn.classList.remove('hideButton');
})