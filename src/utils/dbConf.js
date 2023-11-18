'use strict';

require('./envSetting');

const actionFileName = arguments['1'].main.filename.split("/").pop()

if(actionFileName == 'sequelize'){
    global.sequelizePath = __dirname
}


let setting = {
    host: process.env[process.env.environ + "PSQL_DB_HOST_WRITE"],
    database: process.env[process.env.environ + "PSQL_DB_NAME"],
    username: process.env[process.env.environ + "PSQL_DB_USER"],
    password: process.env[process.env.environ + "PSQL_DB_PASSWORD"],
    dialect: process.env[process.env.environ + "PSQL_DB_TYPE"],
    port: process.env[process.env.environ + "PSQL_DB_PORT"],
    pool: {
        max: 5,
        min: 0,
        idle: 100000,
        acquire: 50000,
        evict: 50000,
        handleDisconnects: true
    },
    // operatorsAliases: false,
    logging: false
};

const Enviroment = {}

Enviroment[process.env.NODE_ENV] = setting

module.exports = Enviroment