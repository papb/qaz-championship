"use strict";

module.exports = function(Sequelize) {
    return {
        name: "foo_bar",
        rawModel: {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            fooId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "foo",
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            barId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "bar",
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            baz: Sequelize.STRING
        },
        setup(models) {
            // Nothing to do here.
        }
    };
};