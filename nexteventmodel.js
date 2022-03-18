const mongoose = require('mongoose')

const nexteventmodel = new mongoose.Schema({

    nextevent : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model('Next Event Data',nexteventmodel)