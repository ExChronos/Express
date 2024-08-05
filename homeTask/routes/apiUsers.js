const express = require('express')
const {v4: uuid} = require('uuid')
const path = require('path')
const fs = require('fs')
const loginMulter = require('../middleWare/login')

const urlencodedParser = express.urlencoded({extended: false});
const apiUserRouter = express.Router()

apiUserRouter.use(express.static('/static/html/'))

class User {
    constructor(name='', email='', id=uuid()){
        this.name=name,
        this.email=email,
        this.id=id
    }
}
const dataBase = {
    users: []
}

// вывод всех пользователей

apiUserRouter.get('/', (req, res) => {

    let db = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '/public/users/db.json')))
    res.render(path.join(__dirname, '..', '/views/user/home'), {
        usersDB: db.users,
    })
})

//№4 - регистрация пользователя
apiUserRouter.get('/login', (_, res) => {
    res.render(path.join(__dirname, '..', '/views/user/login'))
})
// urlencodeParse - нужен потому, что данные отправляются в виде формы
apiUserRouter.post('/login', 
    
    loginMulter.none(),

    (req, res) => {

    if(!req.body)
        return res.sendStatus(400)
    //берем данные о пользователе, а затем и данные из формы об id, имени пользователя, эл почте
    const {users} = dataBase
    const {userName, userEmail} = req.body
    
    //создаем нового пользователя и добавляем его в БД
    const newUser = new User(userName, userEmail)
    users.push(newUser)

    // достаю поля имени и почты из файла db.json
    let userDB = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '/public/users/db.json')))

    // добавляю в массивы names и emails новые почту и имя
    userDB.users.push(newUser)

    let uploadUsers = JSON.stringify(userDB)

    // записываю изменения обратно в файл
    fs.writeFileSync(path.join(__dirname, '..', '/public/users/db.json'), uploadUsers)

    //отправляем пользователю (статус код) и переношу его на главную страницу
    res.status(201)
    res.redirect('/api/user')
})

module.exports = apiUserRouter