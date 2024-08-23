const express = require('express')
const mongose = require('mongoose')

const errorMiddleware = require('./middleware/err-404')
const todoApi = require('./routes/todo')

const app = express()
app.use(express.json())

app.use('/api/todo', todoApi)
app.use(errorMiddleware)

async function start(PORT, UrlDB) {
    
}

const UrlDB = process.env.UrlDB
const PORT = process.env.PORT || 7000

start(PORT, UrlDB)