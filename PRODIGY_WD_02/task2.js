{
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    laps = [];
    document.getElementById("laps").innerHTML = "";
    showButton("PLAY");
}

function lap() {
    if (timerInterval) {
        laps.push(timeToString(elapsedTime));
        let lapList = document.getElementById("laps");
        let li = document.createElement("li");
        li.innerText = laps[laps.length - 1];
        lapList.appendChild(li);
    }
}

function showButton(buttonKey) {
    const playButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");

    if (buttonKey === "PLAY") {
        playButton.style.display = "block";
        pauseButton.style.display = "none";
    } else {
        playButton.style.display = "none";
        pauseButton.style.display = "block";
    }
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);

showButton("PLAY");
}