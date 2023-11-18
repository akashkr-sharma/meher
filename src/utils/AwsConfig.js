'use strict';

const AWS = require('aws-sdk');


class AwsConfig{
    constructor(){
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY
        });
        this.AWS = AWS
    }
}


module.exports = AwsConfig