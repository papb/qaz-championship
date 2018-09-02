"use strict";

const wait = require("./../helpers/wait");
const ellipsis = require("./../helpers/ellipsis");
const sortBy = require("./../helpers/sort-by");
const sanitizeHTML = require("./../helpers/sanitize-html");

const Ranking = require("./ranking");

function fetchAll() {
    const challenge_mocks = [
        "SOME CHALLENGE",
        "SOME OTHER CHALLENGE",
        "QAZWSXEDC",
        "QAZWSXEDCRFVTGBYHNUJMIKOL",
        "QWERTYUIOP",
        "3.141592653589793238",
        "TO BE OR NOT TO BE"
    ];
    const player_mocks = [
        "some_user",
        "another_user",
        "someone",
        "nobody",
        "player_x",
        "player_y",
        "player_z"
    ];
    return wait(1000).then(() => {
        return challenge_mocks.map((value, index) => {
            return {
                name: value,
                id: index,
                rankings: player_mocks.map(value => {
                    return {
                        username: value,
                        millis: Math.floor(Math.random() * 10000)
                    };
                })
            };
        });
    });
}

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
        return fetchAll().then(all => {
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

    addToRanking(username, millis) {
        const newRankingEntry = new Ranking({ username, millis });
        this.rankings.push(newRankingEntry);
        sortBy(this.rankings, x => x.millis);
        // return newRankingEntry;
    }

}

module.exports = Challenge;