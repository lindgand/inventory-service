require('dotenv').config()
const   express = require('express'), 
        app = express(),
        PORT = 8080

//const PORT = process.env.PORT || 3000 

//MONGOOSE
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

//ENV TEST
console.log(process.env.TEST)

//förväntar oss att få requests i json format
app.use(express.json())

app.get('/', (req, res) => {
    //res.send("Hello Node!")
    res.json({ message: "Hello Node skickat från server.js"})
})

//nu får vi allt till notesRouter som finns i router, i /routes/notes
const notesRouter = require('./routes/notes')

//Vi måste berätta att alla requests som kommer från notes skall läggas till notesRouter
app.use('/notes', notesRouter)


const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


app.use('./'), express.static(__dirname, '/html')
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

