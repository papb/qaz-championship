"use strict";

const Sequelize = require("sequelize");

module.exports = {
    path: "/api/registerRanking",
    type: "post",
    suppressReturn: true,
    handler: function(db, req) {
        const body = req.body;
        if (!body.username || !body.challengeId || !body.millis) {
            throw new Error("Invalid POST request to /api/registerRanking");
        }

        return db.ranking.findOne({
            where: {
                username: {
                    [Sequelize.Op.eq]: body.username
                },
                challengeId: {
                    [Sequelize.Op.eq]: body.challengeId
                }
            }
        }).then(foundRanking => {
            if (foundRanking) {
                foundRanking.millis = body.millis;
                return foundRanking.save();
            }
            return db.ranking.create({
                username: body.username,
                challengeId: body.challengeId,
                millis: body.millis
            });
        });
    }
};