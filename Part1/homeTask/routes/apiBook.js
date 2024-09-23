const express = require('express')
const Book = require('../models/book')
const path = require('path')
const mongoose = require('mongoose')
const {v4: uuid} = require('uuid')

const apiBooksRouter = express.Router()

//№1 - отправляет все книги, которые есть на полке
apiBooksRouter.get('/', async (req, res) => {
    try {
        const book = await Book.find().select('-__v')
        res.render(path.join(__dirname, '..', '/views/book/home.ejs'), {
            folder: book
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//№3 - создание книги
apiBooksRouter.get('/skrappa', async (req, res) => {
    res.render(path.join(__dirname, '..', '/views/book/skrappa.ejs'))
})
apiBooksRouter.post('/skrappa', async (req, res) => {
    
    const id = uuid()
    const {title, desc, auth, fav, fCover, fName} = req.body

    const newBook = new Book({
        _id: id,
        title: title,
        auth: auth,
        desc: desc,
        fav: fav,
        fCover: fCover,
        fName: fName
    })

    try {
        await newBook.save()
        res.redirect('/api/book')
    } catch (error) {
        res.status(500).json(error)
    }
})

//№4 - редактирование книги по id
apiBooksRouter.get('/edit/:id', async (req, res) => {
    const {id} = req.params
    const book = await Book.findById(id)
    res.render(path.join(__dirname, '..', '/views/book/edit.ejs'), {
        book: book
    })
})
apiBooksRouter.post('/edit/:id', async (req, res) => {
    const {id} = req.params
    const {title, desc, auth, fav, fCover, fName} = req.body

    try {
        await Book.findByIdAndUpdate(id, {
            title: title,
            desc: desc,
            auth: auth,
            fav: fav,
            fCover: fCover,
            fName: fName
        })
        res.redirect('/api/book')
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//№5 - удаление книги по id
apiBooksRouter.get('/delete/:id', async (req, res) => {

    const {id} = req.params
    try {
        await Book.deleteOne({_id: id})
        res.redirect('/api/book')
    } catch (error) {
        res.status(500).json(error)
    }
})

//№2 - получение книги по id
apiBooksRouter.get('/:id', async (req, res) => {
    const {id} = req.params

    try {
        const book = await Book.findById(id).select('-__v')
        res.render(path.join(__dirname, '..', '/views/book/view.ejs'), {
            book: book
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = apiBooksRouter