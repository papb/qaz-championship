"use strict";

const server = require("./lib/server");
const db = require("./lib/db");
const jsonifyError = require("jsonify-error");
const stringifyError = error => JSON.stringify(jsonifyError(error), null, 4);

/* eslint no-process-exit:off */

db.setup().then(() => {
    const port = 8000;
    return Promise.resolve().then(() => {
        return server.start(port);
    }).then(() => {
        console.log(`Server is listening on port ${port}.`);
    }, error => {
        console.error(`Failed to start server on port ${port}:`, stringifyError(error));
        process.exit(1);
    });
}, error => {
    console.error(`Failed to setup database:`, stringifyError(error));
    process.exit(1);
});