"use strict";

module.exports = function(timeMillis) {
    let millis = timeMillis;
    let seconds = Math.floor(millis / 1000);
    millis -= seconds * 1000;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    millis = "" + millis;
    seconds = "" + seconds;
    minutes = "" + minutes;
    while (millis.length < 3) millis = "0" + millis;
    while (seconds.length < 2) seconds = "0" + seconds;
    while (minutes.length < 2) minutes = "0" + minutes;
    return minutes + ":" + seconds + "." + millis;
};