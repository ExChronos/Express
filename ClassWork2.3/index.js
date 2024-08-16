const express = require('express')

const errorMiddleware = require('./middleWare/error')

const indexRouter = require('./routes/index')
const toDoRouter = require('./routes/todo')

const app = express()

app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.use('/', indexRouter)
app.use('/todo', toDoRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 7000
app.listen(PORT)