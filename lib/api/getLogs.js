"use strict";

const appRoot = require("app-root-path").toString();
const log = require(appRoot + "/lib/log");

module.exports = {
    path: "/api/getLogs",
    type: "get",
    handler: function(db, req) {
        return log.getAsync().then(logs => {
            const logArray = logs.split(/\r?\n/);
            if (!logArray[logArray.length - 1]) {
                logArray.pop();
            }
            return logArray;
        });
    }
};