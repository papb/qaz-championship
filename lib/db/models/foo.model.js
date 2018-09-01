"use strict";

module.exports = function(Sequelize) {
    return {
        name: "foo",
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
            models.foo.belongsToMany(models.bar, { through: models.foo_bar });
        }
    };
};