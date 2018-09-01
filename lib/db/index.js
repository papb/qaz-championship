"use strict";

const appRoot = require("app-root-path").toString();
const jetpack = require("fs-jetpack").cwd(appRoot);

jetpack.dir("storage", { empty: true });

const Sequelize = require("sequelize");
const sequelizeInstance = new Sequelize({
    dialect: "sqlite",
    storage: "storage/db.sqlite",
    operatorsAliases: Sequelize.Op,
    logging: false
});

const modelFiles = jetpack.list("lib/db/models").map(modelFileName => {
    return require(`${appRoot}/lib/db/models/${modelFileName}`)(Sequelize);
});

const models = {};

modelFiles.forEach(modelFile => {
    models[modelFile.name] = sequelizeInstance.define(modelFile.name, modelFile.rawModel, modelFile.options || {});
});

modelFiles.forEach(modelFile => {
    modelFile.setup(models);
});

let setupDone = false;

module.exports = {
    setup() {
        return sequelizeInstance.sync().then(() => {
            setupDone = true;
        });
    },
    get() {
        if (setupDone) return models;
        throw new Error("DB error: tried to get models but setup() was not done yet.");
    }
};