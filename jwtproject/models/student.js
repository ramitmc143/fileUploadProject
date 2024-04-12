const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    userName : {
        type:String,
        unique:true
    },
    password : {
       type:String,
       unique:true
    },
    age : {
        type:Number,
    },
    location : {
        type:String
    }
});

// we will create a collection

const studentData = new mongoose.model('studentData', studentSchema);

module.exports = studentData;