const mongoose = require('mongoose')

const team = new mongoose.Schema({
    
    name :{
        type : String,
        required : true
    },
    clgid :{
        type : String,
        required : true,
    },
    position :{
        type : String,
        required : true,
    },
    mobile :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('Support Team',team)