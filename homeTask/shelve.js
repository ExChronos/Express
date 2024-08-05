const express = require('express')

const apiBooksRouter = require('./routes/apiBook')
const apiUserRouter = require('./routes/apiUsers')
const logger = require('./middleWare/logger')
const err404 = require('./middleWare/err-404')

const app = express()

app.use(logger)


app.use(express.urlencoded({extended: true}));                  // сообщает сайту, что мы используем форму
app.use(express.static('public'))
app.set('view engine', 'ejs');                                  // сообщает сайту, что мы используем шаблонизатор


app.use('/api/book', apiBooksRouter)
app.use('/api/user', apiUserRouter)

app.use(err404)


const PORT = process.env.PORT || 7000
app.listen(PORT, console.log('Server started'))