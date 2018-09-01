"use strict";

const appRoot = require("app-root-path").toString();
const jetpack = require("fs-jetpack").cwd(appRoot);

const express = require("express");
const bodyParser = require("body-parser");
const jsonifyError = require("jsonify-error");
const db = require(appRoot + "/lib/db");

const app = express();

// To serve static files: (from /public)
app.use(express.static("public"));

// To support JSON-encoded bodies:
app.use(bodyParser.json());

// To support URL-encoded bodies:
app.use(bodyParser.urlencoded({ extended: true }));

// APIs
jetpack.list("lib/api").forEach(apiFileName => {
    const apiFile = require(`${appRoot}/lib/api/${apiFileName}`);
    app[apiFile.type](apiFile.path, function(req, res) {
        Promise.resolve().then(() => {
            return apiFile.handler(db.get(), req);
        }).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(jsonifyError(error));
        });
    });
});

module.exports = {
    get() {
        return app;
    },
    start(portNumber) {
        if (typeof portNumber !== "number" || !/^\d+$/.test(portNumber)) {
            throw new Error(`Invalid portNumber: ${portNumber}`);
        }
        return new Promise((resolve, reject) => {
            app.listen(portNumber, resolve).on("error", reject);
        });
    }
};