const libExpress = require('express');
const libUtils = require('../utils.js')
const libPath = require('path');
const fs = require('fs');
const libJwt = require('jsonwebtoken');


const Admin = require('../model/admin.model');
const Books = require('../model/book.model');


const adminRouter = libExpress.Router();



// admin login (api 'admin/login')
adminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            libUtils.logger("Admin not found", 3);
            return res.status(404).json({ "msg": "admin not found" });
        }
        if (password != admin.password) {
            libUtils.logger("Admin not Authorised", 3);
            return res.status(400).json({ "msg": "admin not authorised" });
        }
        const books = await Books.find();

        libJwt.sign({emailid:email},process.env.JWT_SECRET_KEY,(error,token)=>{
            // res.send(token)
            res.cookie(token)
            res.status(200).json({ books: books, admin:admin});
        })
        
    } catch (e) {
        console.log(e);
        libUtils.logger("Error loading Admin", 3);
        res.status(400).json({ "msg": "Error loging admin" });
    }
})

// {name,category,price,author,language,pdfUrl,imageUrl}
// api 'admin/book/add'
adminRouter.post('/book/add', libUtils.upload.fields([{name:"pdf1",maxCount:1},{name:'img1',maxCount:1}]), async (req, res) => {

    const { name, category, price, author, language} = req.body;

    if(!req.files){
        libUtils.logger("Files ware not uploaded", 3);
        res.status(400).json({msg : "files ware not uploaded"})
    }else{

    try {
        const pdfName = req.files['pdf1'][0].filename;
        const imgName = libPath.join(__dirname,"../","uploads", req.files['img1'][0].filename) ;

        const book = new Books({ name, category, price, author, language,pdfName,imgName})
        const newBook = await book.save();
        libUtils.logger("Book saved successfully", 1);
        res.status(200).json({ "msg": "book saved successfully", book: newBook });
    }
    catch (e) {
        console.log(e)
        libUtils.logger("Error adding book", 3);
        res.status(400).json({ "msg": "error adding book" });
    }
}});

// to read file (API = admin/read/filename.pdf)
adminRouter.get('/read/:filename',(req, res)=>{
    const filePath = libPath.join(__dirname,'../', 'uploads', req.params.filename);
    console.log(filePath)
    fs.exists(filePath, (exists)=>{
        if(exists){
            res.sendFile(filePath);
        }
        else{
            libUtils.logger("File not found", 3);
            res.status(404).json({msg: 'File not found'});
        }
    })
})


// delete book (using id)
//api '/admin/delete/book/:id'
adminRouter.delete('/delete/book/:id', libUtils.authantication, async(req, res) => {
    const { _id } = req.params.id;
    try {
        const deletedBook = await Books.deleteOne(_id);
        if (!deletedBook) {
            libUtils.logger("Book not found while deleting", 3);
            res.status(400).json({ "msg": "Book not found" });
        }
        libUtils.logger("Book deleted successfully", 1);
        res.status(200).json({ "msg": "Book deleted Successfully", response: deletedBook })
    }
    catch(e){
        console.log(e);
        libUtils.logger("Error deleting book", 3);
        res.status(400).json({"msg":"Error deleting Book"})
    }
})


//{name,email,phone,password,address}
// api 'admin/add'  
adminRouter.post('/add', libUtils.authantication, async (req, res) => {
    const { name, email, phone, password, address } = req.body;
    try {
        const admin = new Admin({ name, email, phone, password, address })
        const newAdmin = await admin.save();
        libUtils.logger("Admin saved successfully", 1);
        res.status(200).json({ "msg": "admin saved successfully", admin: newAdmin });
    }
    catch (e) {
        console.log(e)
        libUtils.logger("Error adding admin", 3);
        res.status(400).json({ "msg": "error adding admin" });
    }
})



// // // // to delete all books from books collection
// adminRouter.delete('/delete/book/all',async(req, res)=>{
//     try{
//         const deletedBooks = await Books.deleteMany({"price" : 100});
//         if(!deletedBooks){
//             res.status(400).json({msg:"books not deleted"});
//         }
//         res.status(200).json({msg : "all books deleted"});
//     }catch(e){
//         console.log(e);
//         res.status(400).json({msg : "internal server error "});
//     }
// })





module.exports = adminRouter;
