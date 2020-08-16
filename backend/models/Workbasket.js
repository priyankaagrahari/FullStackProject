const mongoose = require('mongoose');

const WorkbasketSchema = new mongoose.Schema({
    assignmentID:{
        type:String,
        required:true,
        unique:true
    },
    departmentID:{
        type:String
    },
    intiatedBy:{
        type:String
    },
    updateDate:{
        type:Date,
        default: Date.now
    }
});

module.exports = Workbasket = mongoose.model('workbasket',WorkbasketSchema);