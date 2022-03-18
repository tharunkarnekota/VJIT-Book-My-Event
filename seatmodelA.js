const mongoose = require('mongoose')

const Seat = new mongoose.Schema({

    clgId : {
        type : String,
        required : true
    },
    namee : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    seatno : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('seats A',Seat)