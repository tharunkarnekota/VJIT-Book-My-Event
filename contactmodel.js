const mongoose = require('mongoose');

const contact = new mongoose.Schema({
    
    userid :{
        type : String,
        required : true
    },
    username :{
        type : String,
        required : true
    },
    clgid :{
        type : String,
        required : true
    },
    problem : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('querys',contact)