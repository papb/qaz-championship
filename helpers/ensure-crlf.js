"use strict";

// This script is used to ensure CRLF in all dist files.

const appRoot = require("app-root-path").toString();
const jetpack = require("fs-jetpack").cwd(appRoot);

jetpack.list("public/scripts").forEach(file => {
    const content = jetpack.read("public/scripts/" + file).replace(/\r?\n/g, "\r\n");
    jetpack.write("public/scripts/" + file, content);
});