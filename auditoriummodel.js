const mongoose = require('mongoose');

const auditorium = new mongoose.Schema({
    
    a1 :{
        type : String,
        required : true
    },
    a2 :{
        type : String,
        required : true
    },
    a3 :{
        type : String,
        required : true
    },
    
})

module.exports = mongoose.model('auditorium',auditorium)