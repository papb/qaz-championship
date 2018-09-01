"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT_NUMBER = 8000;
const fail = require("./lib/utils/fail");

// To serve static files: (from /public)
app.use(express.static("public"));

// To support JSON-encoded bodies:
app.use(bodyParser.json());

// To support URL-encoded bodies:
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT_NUMBER, () => {
    console.log(`Server is listening on port ${PORT_NUMBER}.`);
}).on("error", err => {
    fail(`Failed to start server on port ${PORT_NUMBER}:`, err);
});