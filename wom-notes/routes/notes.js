const express = require('express')
const router = express.Router()
const Note = require('../models/noteModel')
const authorize = require('../middleware/authorize')

router.use(authorize)

/* //Loggar alla metoder ifall man vill
const logMethod = (req, res, next) => {
    console.log(req.method)
    next()
}*/
//router.use(logMethod)

//router .get för att vi hänvisar till const router = express.Router
router.get('/', async (req, res) =>{
    try {
        const notes = await Note.find({archived: {$ne: true}})
        res.send(notes)

    } catch (error) {
        res.status(500).json( {message: error.message })
    }
})
router.get('/archived', async (req, res) =>{
    try {
        const notes = await Note.find({archived: true})
        res.send(notes)

    } catch (error) {
        res.status(500).json( {message: error.message })
    }
})

const getNoteById = async (req, res, next) => {
        //Nu ska vi berätta åt mongodb vilken vi vill redigera
        //id = _id
        const note = await Note.findOne({_id: req.params.id}).exec()
        if(!note) return res.status(404).json({message: "Note not found.."})
        req.note = note
        next()
}

router.get('/:id', getNoteById, async (req, res) => {
    try {
        res.send(req.note)

    } catch (error) {
        res.status(500).json( {message: error.message })
    }
})

router.put('/:id',getNoteById ,async (req, res) => {
    try {
        const updatedNote = await req.note.updateOne(req.body).exec()

        res.json({message: "Note updated! ", modified: updatedNote.modifiedCount})

    } catch (error) {
        res.status(500).json( {message: error.message })
    }
 })

//en endpoint för att skapa nya notes
router.post('/', async (req, res) => {
   //req.body { "text": "hej" }
   try {
    const note = new Note({
        text: req.body.text
    })
    //Await returnerar en kopia av det nya objektet
   const newNote = await note.save()
   res.status(201).send(newNote)

   } catch (error) {
       res.status(500).json( {message: error.message })
   }

})

router.delete('/:id', getNoteById, async (req, res) => {
    try {
        if (req.note.archived) {
            await Note.deleteOne({_id: req.params.id}).exec()
            res.json({message: "Note DELETED!"})
        }  else {
            await req.note.updateOne({ archived: true})
            res.json({message: "Note archived"})
        }
       
    } catch (error) {
        
    }
})

console.log("notes från note.js")

module.exports = router