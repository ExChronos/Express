const express = require('express')
const {v4: uuid} = require('uuid')

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

class User {
    constructor(name='', email='', id=uuid()){
        this.id=id,
        this.name=name,
        this.email=email
    }
}

const dataBase = {
    users: []
}

const app = express()
const urlencodedParser = express.urlencoded({extended: false});
app.use(express.json())

//№1 - отправляет все книги, которые есть на полке
app.get('/api/books', (req, res) => {
    const {books} = shelves
    res.json(books)
})

//№2 - получить книгу по id
app.get('/api/books/:id', (req, res) => {
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

//№3 - создание книги по id
app.get('/api/books', (req, res) => {
    res.sendFile(__dirname+'/createBook.html')
})

app.post('/api/books', urlencodedParser, (req, res) => {
    const {books} = shelves
    const {title, desc, auth, fav, fileName, fileCover} = req.body

    const newBook = new Book(title, desc, auth, fav, fileName, fileCover)
    books.push(newBook)

    res.status(201)
    res.json(`${title} - ${auth}.${fav} баллов`)
})


//№4 - регистрация пользователя
app.get('/api/user/login', (req, res) => {
    res.sendFile(__dirname + '/reg.html')
})

// urlencodeParse - нужен потому, что данные отправляются в виде формы
app.post('/api/user/login', urlencodedParser, (req, res) => {
    //проверка на то, что в теле сайта есть данные
    if(!req.body)
        return res.sendStatus(400)
    //берем данные о пользователе, а затем и данные из формы об id, имени пользователя, эл почте
    const {users} = dataBase
    const {userName, userEmail} = req.body
    
    //создаем нового пользователя и добавляем его в БД - просто массив пользователей
    const newUser = new User(userName, userEmail)
    users.push(newUser)

    //отправляем пользователю (статус код) его имя и почту
    res.status(201)
    res.send(`${newUser.name} - ${newUser.email}`)
})


//№5 - редактировать книгу по id
app.put('/api/books/:id', (req, res) => {
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


//№6 - удаление книги по id
app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 7000
app.listen(PORT)