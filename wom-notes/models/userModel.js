const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    //Första parametern beskrivningen av typen
    email:{ 
        type: String,
        required: true,
        unique: true },
    password: {
        type: String,
        required: true
    }

}, { //Man får automatiskt updates om ändringar man gjort (updated, deleted osv)
    timestamps: true})

    module.exports = mongoose.model('User', usersSchema)