const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const api_user = require('./routes/user_route')
const api_ad = require('./routes/ad_route')
const api_chat = require('./routes/chat_route')

const app = express()

app.use(express.urlencoded({extended: true}));                  // сообщает сайту, что мы используем форму
app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs');  // сообщает сайту, что мы используем шаблонизатор

app.use('/', api_ad);
app.use('/user', api_user);
// app.use('/chat', api_chat);

async function start(URL_db, PORT) {
    try {
        await mongoose.connect(URL_db)
        app.listen(PORT, console.log('Server started'))
    } catch (error) {
        console.log(error)
    }
}

const PORT = process.env.PORT||7000
const uri = process.env.URL_db||'mongodb://localhost:27017/'

start(uri, PORT)