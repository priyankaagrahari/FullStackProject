const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    emailID:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    departmentID:{
        type:String,
        required:true
    }
});

module.exports = Users = mongoose.model('users',Userschema);