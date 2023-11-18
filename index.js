'use strict';

require('dotenv').config();
global.rootDir = __dirname;

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const utils = require('./src/utils');



const app = express();
const apis = require("./src");
const {
	SERVER_PORT
} = require('./src/config/system-config');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './files');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({
    limits: {
        fileSize: 100 * 1024 * 1024,
        files: 25
    }, storage: storage
});

app.use(upload.any());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});




app.use('/api', apis);



const {response, constants} = utils;
app.use(function (err, req, res, next) {
    if (!err.statusCode)
        err.statusCode = constants.ERROR_500.STATUS;
    new response(res).failed(err.statusCode, err.message);
})



app.listen(SERVER_PORT, () => {
	console.log("Server is running!!!");
})