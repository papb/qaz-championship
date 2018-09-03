"use strict";

const appRoot = require("app-root-path").toString();
const jetpack = require("fs-jetpack").cwd(appRoot);

function logStr(str) {
    const result = `${new Date().toISOString()} ${str}`;
    console.log(result);
    return result;
}

module.exports = function(str) {
    if (!jetpack.exists("storage/logs.txt")) {
        jetpack.write("storage/logs.txt", logStr("Auto-created log file.") + "\n");
    }
    jetpack.append("storage/logs.txt", logStr(str) + "\n");
};

module.exports.async = function(str) {
    return jetpack.existsAsync("storage/logs.txt").then(exists => {
        if (exists) return;
        return jetpack.writeAsync("storage/logs.txt", logStr("Auto-created log file."));
    }).then(() => {
        jetpack.appendAsync("storage/logs.txt", logStr(str) + "\n");
    });
};

module.exports.getAsync = function() {
    return jetpack.readAsync("storage/logs.txt");
};