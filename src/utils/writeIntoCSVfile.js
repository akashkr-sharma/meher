'use strict';

const fs = require("fs");


/**
 * writeIntoCSVfile can be use as utils file, we can dynamically save our object in csv format
 * based on the object passed to the functions.
 */
const writeIntoCSVfile = (filename, option) => {

    return new Promise((resolve, reject) => {
        if(!option)
            reject({
                message: "please pass valid arguments as parameter"
            })
        else
            fs.stat(filename, (error, success) => {
                let csv = "\n";
                let optionKeys = Object.keys(option);

                optionKeys.forEach((key, index) => {
                    if(index)
                        csv += ",";
                    csv += `"${option[key]}"`
                })
                if(error){
                    let firstLine = "";
                    optionKeys.forEach((key, index) => {
                        if(index)
                            firstLine += ","
                        firstLine += key;
                    });
                    firstLine += csv;
                    fs.writeFile(filename, firstLine, (error, success) => {
                        if(error)
                            reject(error);
                        else
                            resolve();
                    });
                }else{
                    // let csv = `\n${option.partner_id},${option.partner_ph_no},${option.wallet_id},${option.created_at},${(option.recharge_amount)},${option.tx_created_at},${option.tx_updated_at}`;
                    fs.appendFile(filename, csv, (error, success) => {
                        if(error)
                            reject(error)
                        else
                            resolve();
                    });
                }

            })
    })
};


const recursion = (filename, jsonData) => {
    return new Promise((resolve, reject) => {
        try{
            const loop = async(index=0) => {
                if(index == jsonData.length){
                    resolve()
                }else{
                    try{
                        await writeIntoCSVfile(filename, jsonData[index])
                        loop(++index)
                    }catch(error){
                        throw(error)
                    }
                }
            }
            loop()
        }catch(error){
            reject(error)
        }
    })
}



module.exports = {
    recursion,
    writeIntoCSVfile
};
