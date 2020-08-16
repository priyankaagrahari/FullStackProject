const mongoose = require('mongoose');

const WorklistSchema = new mongoose.Schema({
    formID:{
        type:String,
        required:true,
        unique:true
    },
    initiatedBy:{
        type:String
    },
    updateDate:{
        type:Date,
        default: Date.now
    }
});

module.exports = Worklist = mongoose.model('worklist',WorklistSchema);