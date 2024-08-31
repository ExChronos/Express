const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

const apiBooksRouter = require('./routes/apiBook')
const apiUserRouter = require('./routes/apiUsers')
const logger = require('./middleWare/logger')
const err404 = require('./middleWare/err-404')

const app = express()

app.use(logger)

app.use(express.urlencoded({extended: true}));                  // сообщает сайту, что мы используем форму
// app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs');                                  // сообщает сайту, что мы используем шаблонизатор
app.use(session({secret: 'SECRET'}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/api/book', apiBooksRouter)
app.use('/api/user', apiUserRouter)

app.use(err404)

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT)
    } catch (error) {
        console.log(error)
    }
};

const PORT = process.env.PORT || 7000;
const UrlDB = 'mongodb://localhost:27017/'

start(PORT, UrlDB)