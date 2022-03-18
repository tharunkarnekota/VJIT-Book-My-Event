const mongoose = require('mongoose')

const Poster = new mongoose.Schema({

    pic : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Poster',Poster)