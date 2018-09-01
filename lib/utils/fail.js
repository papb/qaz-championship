"use strict";

const jsonifyError = require("jsonify-error");

module.exports = function fail(message, error) {
    if (!(error instanceof Error)) {
        throw new Error("fail() was called without an error.");
    }
    console.error(message, JSON.stringify(jsonifyError(error), null, 4));
    throw error;
};