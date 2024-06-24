const libMongoose = require('mongoose');


//{  name,email,phone,password,address}
const adminSchema = new libMongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const Admin = libMongoose.model('Admin',adminSchema);

module.exports = Admin;
