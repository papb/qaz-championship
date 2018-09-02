"use strict";

const elementIds = [
    "rankings",
    "goalString",
    "yourTyping",
    "loading",
    "pageContent",
    "challenges",
    "username"
];

const elements = {};

elementIds.forEach(id => {
    elements[id] = document.getElementById(id);
});

module.exports = elements;