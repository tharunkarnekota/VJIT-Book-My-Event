const mongoose = require('mongoose')

const years = new mongoose.Schema({

    year1 : {
        type : String,
        required : true
    },
    year2 : {
        type : String,
        required : true
    },
    year3 : {
        type : String,
        required : true
    },
    year4 : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('batch for registration',years)