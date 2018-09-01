"use strict";

module.exports = function(Sequelize) {
    return {
        name: "bar",
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
            models.bar.belongsToMany(models.foo, { through: models.foo_bar });
        }
    };
};