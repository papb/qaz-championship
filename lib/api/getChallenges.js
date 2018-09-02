"use strict";

module.exports = {
    path: "/api/getChallenges",
    type: "get",
    handler: function(db, req) {
        return db.challenge.findAll({
            include: [{
                model: db.ranking
            }]
        });
    }
};