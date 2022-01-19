const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    //Första parametern beskrivningen av typen
    text: String,
    archived: Boolean

}, { //Man får automatiskt updates om ändringar man gjort (updated, deleted osv)
    timestamps: true})

    module.exports = mongoose.model('Note', notesSchema)