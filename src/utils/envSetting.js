'use strict';

require("dotenv").config()

const env = process.env.ENV;

process.env.NODE_ENV = env

let environ;
switch (env) {
    case 'local':
        environ = "LOCAL_";
        break;
    case "dev":
        environ = "DEV_";
        break;
    case "prod":
        environ = "PROD_";
        break;
}

process.env.environ = environ

if (!environ) {
    console.log("env not set");
    process.exit();
}