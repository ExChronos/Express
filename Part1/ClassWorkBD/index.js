const express = require('express');
const mongoose = require('mongoose');

const errMiddleware = require('./middleware/error');
const todoApiRouter = require('./routes/api/todo');

const app = express();
app.use(express.json())

app.use('/api/todo', todoApiRouter)

app.use(errMiddleware)

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT)
    } catch (error) {
        console.log(error)
    }
};

const PORT = process.env.PORT || 7000;
const UrlDB = process.env.UrlDB || 'mongodb://localhost:27017/';

start(PORT, UrlDB)