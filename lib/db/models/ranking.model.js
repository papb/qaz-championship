"use strict";

module.exports = function(Sequelize) {
    return {
        name: "ranking",
        rawModel: {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            challengeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "challenges",
                    key: "id"
                },
                onDelete: "RESTRICT"
            },
            username: Sequelize.STRING,
            millis: Sequelize.INTEGER
        },
        setup(models) {
            models.ranking.belongsTo(models.challenge);
        }
    };
};