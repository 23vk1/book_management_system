const libMongoose = require('mongoose');
const multer = require('multer');
const libPath = require('path');
const libJwt = require('jsonwebtoken');
const libMoment = require('moment');
const libFs = require('fs');
const libChalk = require('chalk');

const User = require('./model/user.model.js');
const Admin = require('./model/admin.model.js');
const Books = require('./model/book.model.js');

const utils = {};
utils.connection = libMongoose.connect(process.env.MONGO_URL).then(() => {
    utils.logger("mongodb connected", 1);
});

utils.storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, callback) {
        callback(null, Date.now() + libPath.extname(file.originalname));
    }})

utils.upload = multer({
    storage: utils.storage
})

utils.authantication = (req, res, next) => {
    // varify if user is logged in or not 
    if (req.cookies.token) {
        libJwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY, (error, decoded) => {
            if (error) {
                res.clearCookie('token');
                return res.status(400).json({msg:"user not authorised redirect to login page"});
            } else {
                next();
            }
        })
    } else {
        res.status(400).json({msg:"user not authorised redirect to login page"});
    }
},


utils.logColorPicker = {
    0:libChalk.white,
    1:libChalk.green,
    2:libChalk.yello,
    3:libChalk.red
}

utils.logSignPIcker = {
    0:'[*]',
    1:'[+]',
    2:'[!]',
    3:'[-]'
}

const logFilePath = `${libPath.join(__dirname,'logs',`${libMoment().format("DD-MM-YYYY")}.log`)}`

utils.logger = (msg, escalation = 0)=>{
    const log = `\n${utils.logSignPIcker[escalation]} ${libMoment().format("DD-MM-YYYY HH:mm:ss")} ${msg}`

    // to check if log file is exists 
    libFs.access(logFilePath, libFs.constants.F_OK, (err)=>{
        if(err){
            // if log file does not exist that this will create one 
            libFs.writeFileSync(logFilePath,log);
        }
        else{
            // iuf log file exist that this will append the log into the file 
            libFs.appendFileSync(logFilePath, log);
        }
    })
    console.log(utils.logColorPicker[escalation](log));
}


module.exports = utils;

