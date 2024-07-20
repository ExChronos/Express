const express = require('express')
const {v4: uuid} = require('uuid')
const fileMulter = require('../middleware/multer')

class Book{
    constructor(title='', auth='', id=uuid()){
        this.title=title
        this.auth=auth
        this.id=id
    }
}

const shelve = {
    books: []
}

const bookRouter = express.Router()


bookRouter.get('/home', (req, res) => {
    const {books} = shelve
    res.json(books)
})

bookRouter.get('/upload', (req, res) => {
    res.sendFile(__dirname+'/static/createBook.html')
})
bookRouter.post('/upload',
        fileMulter.single('book'),
        (req, res) => {

            if(req.file){
                const {path} = req.file
                res.json(path)
            } else 
                res.json('Can`t accept the file')
        }
)

module.exports = bookRouter