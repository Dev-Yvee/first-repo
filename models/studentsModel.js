const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    FirstName: {
        required: true,
        type: String
    },
    LastName: {
        required: true,
        type: String
    },
    Age:{
        required:true,
        type:Number

    },
    RegistrationNumber: {
        required: true,
        type: String,
        unique:true
    }
})

module.exports = mongoose.model('students', dataSchema)