const express = require('express')
const {v4: uuid} = require('uuid')
const fileMulter = require('../middleWare/mult')
const path = require('path')
const fs = require('fs')

class Book {
    constructor(title='', desc='', auth='', fav='', id=uuid()){
        this.title=title,
        this.desc=desc,
        this.auth=auth,
        this.fav=fav,
        this.id=id
    }
}
const shelves = {
    books: []
}

const apiBooksRouter = express.Router()

//№1 - отправляет все книги, которые есть на полке
apiBooksRouter.get('/', (req, res) => {

    let files = fs.readdirSync(path.join(__dirname,'..', '/public/downloadBooks/'))

    res.render('../views/book/home', {
        folder: files,
    })

})

//№2 - создание книги по id
apiBooksRouter.get('/loader/upload', (_, res) => {
    res.render(path.join(__dirname, '..', 'views/book/upload.ejs'))
})
apiBooksRouter.post('/loader/upload',
    
    fileMulter.none(),

    (req, res) => {

    const {books} = shelves
    const {title, desc, auth, fav} = req.body

    let newBook = new Book(title, desc, auth, fav)
    let uploadBook = JSON.stringify(newBook)

    if(`${title}.json` in fs.readdirSync(path.join(__dirname, '..', '/public/downloadBooks/'))){
        fs.writeFileSync(path.join(__dirname, '..', 'public/downloadBooks', `${title}.json`), uploadBook)
    } else {
        fs.appendFileSync(path.join(__dirname, '..', 'public/downloadBooks', `${title}.json`), uploadBook)

    }
    res.redirect('/api/book')
})

// №3 - редактирование книги
apiBooksRouter.get('/:name', (req, res) => {
    res.render(path.join(__dirname, '..', '/views/book/edit.ejs'))
})
apiBooksRouter.post('/:name', (req, res) => {
    const {desc, auth, fav} = req.body
    const {name} = req.params    

    if(fs.readFileSync(path.join(__dirname, '..', `/public/downloadBooks/${name}`))){
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', `/public/downloadBooks/${name}`)))

        if(!(desc) && !(auth) && !(fav)){
            data = {
                desc: "",
                auth: "",
                fav: ""
            }
        }else{
            data.desc = desc
            data.auth = auth
            data.fav = fav
        }

        let pushData = JSON.stringify(data)

        fs.writeFileSync(path.join(__dirname, '..', `/public/downloadBooks/${name}`), pushData, (err) => {
            console.error(err)
        })
    } else{
        res.send('file not found')
    }

    res.redirect('/api/book')
})

apiBooksRouter.get('/delete/:name', (req, res) => {
    res.render(path.join(__dirname, '..', `/views/book/delete.ejs`))
})
apiBooksRouter.post('/delete/:name', (req, res) => {
    const {yes, no} = req.body
    const {name} = req.params

    if(yes){
        fs.rmSync(path.join(__dirname, '..', `/public/downloadBooks/${name}`))
        res.redirect('/api/book')
    }else if(no){
        res.redirect('/api/book')
    } else{
        res.send('Fool answer. Redirect home')
        res.redirect('/api/book')
    }
})

apiBooksRouter.get('/view/:name', (req, res) => {

    let {name} = req.params

    let file = JSON.parse(fs.readFileSync(path.join(__dirname, '..', `/public/downloadBooks/${name}`)))

    res.render(path.join(__dirname, '..', `/views/book/view.ejs`), {
        data: file,
    })
})


module.exports = apiBooksRouter