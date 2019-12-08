const express = require('express')
const todoRoutes = require('./routes/todo.routes')
const mongodb = require('./mongodb/mongodb.connect')
const app = express()

mongodb.connect()

app.use(express.json())

app.use('/todos', todoRoutes)
app.use((err, req, res, next)=>{
    res.status(500).json({message: err.message})
})

app.get('/', (req, res) => {
    res.json('hello world')
})

/*app.listen(3000, () => {
    console.log('server is now running')
})*/

module.exports = app