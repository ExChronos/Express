const express = require('express')
const {v4: uuid} = require('uuid')
const fileMulter = require('../middleWare/mult')

class Book {
    constructor(title='', desc='', auth='', fav='', fileCover='', fileName='', id=uuid()){
        this.title=title,
        this.desc=desc,
        this.auth=auth,
        this.fav=fav,
        this.fileName=fileName,
        this.fileCover=fileCover,
        this.id=id
    }
}
const shelves = {
    books: []
}

const apiBooksRouter = express.Router()

apiBooksRouter.use(express.static('/static/html/'))


//№1 - отправляет все книги, которые есть на полке
apiBooksRouter.get('/', (_, res) => {
    const {books} = shelves
    res.json(books)
})

//№3 - создание книги по id
apiBooksRouter.get('/loader/upload', (_, res) => {
    res.sendFile(__dirname+"/static/html/createBook.html")
})
apiBooksRouter.post('/loader/upload',
    fileMulter.single('fileName'),
    (req, res) => {
        let file = req.file

        if(!file)
            res.json('Not file')
        else
            res.json(file)
})

//№2 - получить книгу по id
apiBooksRouter.get('/:id', (req, res) => {
    const {books} = shelves
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx) {
        res.json(books[idx])
    } else{
        res.status(404);
        res.json('404 | page not found')
    }
})

//№4 - редактировать книгу по id
apiBooksRouter.put('/:id', (req, res) => {
    const {books} = shelves
    const {title, desc, auth, fav, fileName, fileCover} = req.body
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx){
        books[idx] = {
            ...books[idx],
            title,
            desc,
            auth,
            fav,
            fileName,
            fileCover
        }

        res.json(books[idx])

    } else{
        res.status(404)
        res.json('404 | page not found')
    }
})

//№5 - удаление книги по id
apiBooksRouter.delete('/:id', (req, res) => {
    const {books} = shelves
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx){
        books.splice(idx, 1)
    } else{
        res.status(404)
        res.json('404 | page not found')
    }
})

//№6 - получить книгу по 
apiBooksRouter.get('/:id/download', (req, res) => {
    

    res.json(express.static(__dirname+'../public'))
})

module.exports = apiBooksRouter