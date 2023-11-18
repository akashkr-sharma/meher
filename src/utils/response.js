'use strict';


const constants = require("./constants");


class Response{
    constructor(response){
        this.response = response
    }

    success(statusCode, message = "", data = null){
        let responseObj = {};
        data? responseObj.data = data: null;
        responseObj.status = statusCode? statusCode: constants.SUCCESS_200.STATUS;
        responseObj.message = message? message: constants.SUCCESS_200.MESSAGE; 
        this.response.statusCode = responseObj.status;
        this.response.json(responseObj);
    }

    failed(statusCode, message, hint=null){
        let responseObj = {};
        responseObj.status = statusCode? statusCode: constants.SUCCESS_200.STATUS;
        responseObj.message = message? message: constants.SUCCESS_200.MESSAGE;
        // console.log("process.env.DEBUG: ", typeof(process.env.DEBUG));
        
        if(JSON.parse(process.env.DEBUG))
            responseObj.hint = hint;
        this.response.statusCode = responseObj.status;
        // console.log("error : ", responseObj);
        this.response.json(responseObj);
    }

}


module.exports = Response