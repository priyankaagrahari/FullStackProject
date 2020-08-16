const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    departmentID:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    }
});

module.exports = Departments = mongoose.model('departments',DepartmentSchema);