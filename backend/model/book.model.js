const libMongoose = require('mongoose');

    // {name,category,price,author,language,pdfUrl,imageUrl}

const BookSchema = new libMongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    pdfName: {
        type: String,
        required: true
    },
    imgName: {
        type: String,
        required: true
    }
});

const Books = libMongoose.model('Books',BookSchema);

module.exports = Books;
