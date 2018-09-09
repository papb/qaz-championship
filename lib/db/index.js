"use strict";

const appRoot = require("app-root-path").toString();
const jetpack = require("fs-jetpack").cwd(appRoot);
const getNowString = require(appRoot + "/helpers/get-now-string");

const Sequelize = require("sequelize");
const sequelizeInstance = new Sequelize({
    dialect: "sqlite",
    storage: "storage/db/db.sqlite",
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
    setup(resetEverything = false) {
        jetpack.dir("storage/db");
        const alreadyExisted = !!jetpack.exists("storage/db/db.sqlite");
        if (resetEverything && alreadyExisted) {
            const name = `db_backup_${getNowString()}`;
            jetpack.copy("storage/db/db.sqlite", `storage/${name}/${name}.sqlite`);
            jetpack.remove("storage/db/db.sqlite");
        }

        return sequelizeInstance.sync().then(() => {

            if (alreadyExisted && !resetEverything) return;

            const seederFiles = jetpack.list("lib/db/seeders").map(seederFileName => {
                return require(`${appRoot}/lib/db/seeders/${seederFileName}`);
            });

            const promises = seederFiles.map(seederFile => {
                return models[seederFile.name].bulkCreate(seederFile.values);
            });

            return Promise.all(promises);

        }).then(() => {
            setupDone = true;
            return alreadyExisted;
        });
    },
    get() {
        if (setupDone) return models;
        throw new Error("DB error: tried to get models but setup() was not done yet.");
    }
};