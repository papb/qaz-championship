"use strict";

const server = require("./lib/server");
const db = require("./lib/db");
const log = require("./lib/log");
const jsonifyError = require("jsonify-error");
const stringifyError = error => JSON.stringify(jsonifyError(error), null, 4);

/* eslint no-process-exit:off */

const resetDB = process.argv && process.argv[2] === "--reset";

log(`Starting server... ${resetDB ? "Resetting DB completely." : "Setting up DB without reset."}`);

db.setup(resetDB).then(alreadyExisted => {
    if (!resetDB && !alreadyExisted) {
        log(`DB was created from scratch because no existing DB was found.`);
    }
    const port = 8000;
    return Promise.resolve().then(() => {
        return server.start(port);
    }).then(() => {
        log(`Server is listening on port ${port}.`);
    }, error => {
        log(`Error: Failed to start server on port ${port}: ${stringifyError(error)}`);
        process.exit(1);
    });
}, error => {
    log(`Error: Failed to setup database: ${stringifyError(error)}`);
    process.exit(1);
});