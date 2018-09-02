"use strict";

module.exports = function(Sequelize) {
    return {
        name: "challenge",
        rawModel: {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: Sequelize.STRING
        },
        setup(models) {
            models.challenge.hasMany(models.ranking);
        }
    };
};