"use strict";

const millisToString = require("./../helpers/millis-to-string");
const sanitizeHTML = require("./../helpers/sanitize-html");

class Ranking {

    constructor({ id, username, millis }) {
        this.id = id;
        this.username = username;
        this.millis = millis;
    }

    toString() {
        const millisString = millisToString(this.millis);
        return `
            <div class="rankingRow">
                <div style="padding: 0 30px; float: left;">${sanitizeHTML(this.username)}</div>
                <div style="padding: 0 30px; float: right;">${sanitizeHTML(millisString)}</div>
            </div>
        `;
    }

}

module.exports = Ranking;