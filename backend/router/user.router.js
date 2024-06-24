const libExpress = require('express');
const User = require('../model/user.model.js');
const Books = require('../model/book.model.js');
const libPath = require('path');
const fs = require('fs');
const libJwt = require('jsonwebtoken');
const libUtils = require('../utils.js');

const userRouter = libExpress.Router();

// user login
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            libUtils.logger("user not found", 3);
            return res.status(404).json({ "msg": "user not found" });
        }
        if (password != user.password) {
            libUtils.logger("user not authorised", 3);
            return res.status(400).json({ "msg": "user not authorised" });
        }
        const books = await Books.find();
        libJwt.sign({ emailid: email }, process.env.JWT_SECRET_KEY, (error, token) => {
            res.cookie("token", token);
            res.status(200).json({ books: books, user: user });
        })
    } catch (e) {
        console.log(e);
        libUtils.logger("Error loging user", 3);
        res.status(400).json({ "msg": "Error loging user" });
    }
})


// userRouter.get('/login',(req, res)=>{
//     console.log("login page get");
//     res.status(200).json({msg:"login page"});
// })

// to read file (API = user/read/filename.pdf)
userRouter.get('/read/:filename', libUtils.authantication, (req, res) => {
    const filePath = libPath.join(__dirname, '../', 'uploads', req.params.filename);
    console.log(filePath)
    fs.exists(filePath, (exists) => {
        if (exists) {
            res.sendFile(filePath);
        }
        else {
            libUtils.logger("File not found", 3);
            res.status(404).json({ msg: 'File not found' });
        }
    })
})


//{name,email,phone,password,address}
userRouter.post('/user/register', async (req, res) => {
    const { name, email, phone, password, address } = req.body;
    try {
        const user = new User({ name, email, phone, password, address })
        const newUser = await user.save();
        libUtils.logger("User Saved Successfully", 1);
        res.status(200).json({ "msg": "user saved successfully", user: newUser });
    }
    catch (e) {
        console.log(e)
        libUtils.logger("Error adding user", 3);
        res.status(400).json({ "msg": "error adding user" });
    }
})



module.exports = userRouter;


