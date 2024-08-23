const express = require('express')
const {v4: uuid} = require('uuid')
const Book = require('../models/book')

const apiBooksRouter = express.Router()

//№1 - отправляет все книги, которые есть на полке
apiBooksRouter.get('/', async (req, res) => {
    try {
        const book = await Book.find().select('-__v')
        res.json(book)
    } catch (error) {
        res.status(500).json(e)
    }
})

//№2 - получение книги по id
apiBooksRouter.get('/:id', async (req, res) => {
    const {id} = req.params

    try {
        const book = await Book.findById(id).select('-__v')
        res.json(book)
    } catch (error) {
        res.status(500).json(e)
    }
})

//№3 - создание книги
apiBooksRouter.post('/', async (req, res) => {
    const {title, desc, auth, fav, fCover, fName} = req.params
    const id = uuid()

    const newBook = new Book({
        title,
        desc,
        auth,
        fav,
        fCover,
        fName,
        id
    })

    try {
        await newBook.save()
        res.json(newBook)
    } catch (error) {
        res.status(500).json(e)
    }
})

//№4 - редактирование книги по id
apiBooksRouter.put('/:id', async (req, res) => {
    const {id} = req.params
    const {title, desc, auth, fav, fCover, fName} = req.body

    try {
        await Book.findByIdAndUpdate({
            title,
            desc,
            auth,
            fav,
            fCover,
            fName
        })
        res.redirect(`/:${id}`)
    } catch (error) {
        res.status(500).json(e)
    }
})

//№5 - удаление книги по id
apiBooksRouter.delete('/:id', async (req, res) => {
    const {id} = req.params

    try {
        await Book.deleteOne({_id: id})
        res.json(true)
    } catch (error) {
        res.status(500).json(e)
    }
})

module.exports = apiBooksRouter