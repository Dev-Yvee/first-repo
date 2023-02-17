const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    Title: {
        required: true,
        type: String
    },
    Author: {
        required: true,
        type: String
    },
    SerialNumber: {
        required: true,
        type: String,
        unique:true
    }
})

module.exports = mongoose.model('books', dataSchema)