"use strict";

const ellipsis = require("./../helpers/ellipsis");
const sortBy = require("./../helpers/sort-by");
const sanitizeHTML = require("./../helpers/sanitize-html");
const http = require("./../helpers/http");

const Ranking = require("./ranking");

class Challenge {

    constructor({ id, name, rankings }) {
        this.id = id;
        this.name = name;
        this.rankings = sortBy(rankings.map(ranking => new Ranking(ranking)), x => x.millis);
    }

    static onChallengeSelect(handler) {
        window.selectChallengeById = function(id) {
            handler(id);
        };
    }

    static getAll() {
        return http.get("/api/getChallenges").then(all => {
            all = all.map(c => new Challenge(c));
            return sortBy(all, x => x.name);
        });
    }

    toString() {
        return `
            <div class="challengeRow">
                <a href="#" onclick="selectChallengeById(${this.id})">
                    <div>${ellipsis(sanitizeHTML(this.name), 18)}</div>
                </a>
            </div>
        `;
    }

    registerRanking(username, millis) {
        const currentUserRanking = this.rankings.find(r => r.username === username);

        if (currentUserRanking && currentUserRanking.millis <= millis) return;

        if (currentUserRanking) {
            currentUserRanking.millis = millis;
        } else {
            const newRankingEntry = new Ranking({ username, millis });
            this.rankings.push(newRankingEntry);
        }

        sortBy(this.rankings, x => x.millis);

        http.post("/api/registerRanking", {
            username: username,
            millis: millis,
            challengeId: this.id
        }).catch(error => {
            const message = "There was an error when uploading your ranking to the database: your score will only be kept locally. Check your internet connection.";
            window.alert(message);
            console.error("Error:", error);
        });
    }

}

module.exports = Challenge;