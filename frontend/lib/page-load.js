"use strict";

const fixSizes = require("./../helpers/fix-sizes");
const Challenge = require("./challenge");
const keyboard = require("./keyboard");
const timer = require("./timer");
const elements = require("./elements");

let allChallenges = undefined;
let currentChallenge = undefined;

function getChallengeById(id) {
    return allChallenges ? allChallenges.find(c => c.id === id) : null;
}

function activateChallenge(challenge) {
    elements.rankings.innerHTML = challenge.rankings.join("");
    elements.goalString.innerHTML = challenge.name;
    keyboard.beReady(challenge.name);
    currentChallenge = challenge;
    timer.reset();
    timer.color("blue");
    elements.yourTyping.style.color = "#ffcc00";
    elements.yourTyping.innerHTML = "START TYPING!";
}

keyboard.setOnBegin(() => {
    elements.yourTyping.style.color = "#ffcc00";
    elements.yourTyping.innerHTML = keyboard.getCurrentString();
    timer.begin();
    timer.color("blue");
});
keyboard.setOnProgress(() => {
    elements.yourTyping.style.color = "#ffcc00";
    elements.yourTyping.innerHTML = keyboard.getCurrentString();
});
keyboard.setOnWin(() => {
    elements.yourTyping.style.color = "green";
    elements.yourTyping.innerHTML = keyboard.getCurrentString();
    timer.end();
    timer.color("green");
    keyboard.beReady(currentChallenge.name);
});
keyboard.setOnLose(() => {
    elements.yourTyping.style.color = "red";
    elements.yourTyping.innerHTML = keyboard.getCurrentString();
    timer.end();
    timer.color("red");
    keyboard.beReady(currentChallenge.name);
});
keyboard.setOnImmediateLose(() => {
    elements.yourTyping.style.color = "red";
    elements.yourTyping.innerHTML = keyboard.getCurrentString();
    timer.reset();
    timer.color("red");
    keyboard.beReady(currentChallenge.name);
});

module.exports = function() {

    Challenge.getAll().then(challenges => {
        allChallenges = challenges;

        elements.loading.style.display = "none";
        elements.pageContent.style.display = "table";

        fixSizes();

        elements.challenges.innerHTML = allChallenges.join("");

        activateChallenge(challenges[0]);
    });

    Challenge.onChallengeSelect(id => {
        activateChallenge(getChallengeById(id));
    });

};