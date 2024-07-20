const express = require('express')
const {v4: uuid} = require('uuid')

const urlencodedParser = express.urlencoded({extended: false});
const apiUserRouter = express.Router()

apiUserRouter.use(express.static('/static/html/'))

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

//№4 - регистрация пользователя

apiUserRouter.get('/login', (_, res) => {
    res.sendFile(__dirname+"/static/html/reg.html")
})
// urlencodeParse - нужен потому, что данные отправляются в виде формы
apiUserRouter.post('/login', urlencodedParser, (req, res) => {
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

module.exports = apiUserRouter