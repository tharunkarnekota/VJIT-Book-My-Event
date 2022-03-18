const mongoose = require('mongoose')

const openregister = new mongoose.Schema({

    dummy : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model('open Registration schema',openregister)