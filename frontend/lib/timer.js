"use strict";

const millisToString = require("./../helpers/millis-to-string");
const timerElement = document.getElementById("timer");

let beginTime = undefined;
let interval = undefined;

function get() {
    return (new Date()).getTime() - beginTime;
}

function clear() {
    clearInterval(interval);
    interval = undefined;
}

module.exports = {
    begin() {
        if (interval) throw new Error("Tried to begin the timer but it has already begun.");
        beginTime = (new Date()).getTime();
        timerElement.innerHTML = "00:00.000";
        interval = setInterval(() => {
            timerElement.innerHTML = millisToString(get());
        }, 50);
    },
    end() {
        if (!interval) throw new Error("Tried to end the timer but it has already ended.");
        const result = get();
        clear();
        timerElement.innerHTML = millisToString(result);
        return result;
    },
    reset() {
        timerElement.innerHTML = "00:00.000";
    },
    color(color) {
        timerElement.style.color = color;
    }
};