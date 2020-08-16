const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    createdBy:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    requests:[{
        requestType:{
            type:String
        },
        requestActor:{
            type:String
        },
        comment:{

        }
    }]
});

module.exports = Forms = mongoose.model('forms',FormSchema);