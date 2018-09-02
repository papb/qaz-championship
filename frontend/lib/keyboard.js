"use strict";

function isFocusOnATextField() {
    if (!document.activeElement || !document.activeElement.tagName) return false;
    const tag = document.activeElement.tagName.toUpperCase();
    const type = document.activeElement.type && document.activeElement.type.toLowerCase();
    return (tag === "INPUT" && type === "text") || tag === "TEXTAREA";
}

const pub = {};

const priv = {
    goal: undefined,

    currentStr: "",

    onBegin: undefined,
    onProgress: undefined,
    onWin: undefined,
    onLose: undefined,
    onImmediateLose: undefined
};

pub.setOnBegin = function(onBegin) { priv.onBegin = onBegin; };
pub.setOnProgress = function(onProgress) { priv.onProgress = onProgress; };
pub.setOnWin = function(onWin) { priv.onWin = onWin; };
pub.setOnLose = function(onLose) { priv.onLose = onLose; };
pub.setOnImmediateLose = function(onImmediateLose) { priv.onImmediateLose = onImmediateLose; };

pub.beReady = function(goal) {
    priv.currentStr = "";
    priv.goal = goal.toUpperCase();
};

pub.getCurrentString = () => priv.currentStr;

function handleKeyPressed(key) {
    priv.currentStr += key;
    if (priv.currentStr === priv.goal) {
        priv.onWin();
    } else if (!priv.goal.startsWith(priv.currentStr)) {
        if (priv.currentStr.length === 1) {
            priv.onImmediateLose();
        } else {
            priv.onLose();
        }
    } else if (priv.currentStr.length === 1) {
        priv.onBegin();
    } else {
        priv.onProgress();
    }
}

document.onkeypress = function(e) {
    if (!priv.goal) return;
    if (isFocusOnATextField()) return;
    const key = String.fromCharCode(e ? e.which : window.event.which);
    if (!key || !/^[\u0020-\u007e\u00a0-\u00ff]$/.test(key)) return;
    handleKeyPressed(key.toUpperCase());
};

module.exports = pub;