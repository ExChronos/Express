const express = require('express')
const {v4: uuid} = require('uuid')

class Todo {
    constructor(title="", desc="", id = uuid()){
        this.title=title,
        this.desc=desc,
        this.id=id
    }
};

const stor = {
    todo: [],
};

const app = express()
app.use(express.json())         //мы хотим принимать некоторую информацию в формате json

//get №1 - возвращает все записи
app.get('/api/todo', (req, res) => {
    const {todo} = stor // берет список из объекта
    res.json(todo) // отправляет этот список в формате json
})

//get №2 - возвращает запись по ее идентификатору
app.get('/api/todo:id', (req, res) => {
    const {todo} = stor
    const {id} = req.params // берем индекс записи из запроса
    const index = todo.findIndex(el => el.id === id) // индекс записи - тот индекс, id которого равен id из параметра

    if(index !== -1){           // если index существует, то отправить запись в формате json с этим индексом
        res.json(todo[index])
    } else {                    // если нет, то отправить код ошибки 404 - запись не найдена
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

// post - создает новую запись в массиве
app.post('/api/todo/', (req, res) => {
    const {todo} = stor                     // берем массив из хранилища
    const {title, desc} = req.body          // получаем некоторую информацию из тела запроса

    const newTodo = new Todo(title, desc)   // формируем новую запись
    todo.push(newTodo)                      // добавляем запись в массив

    res.status(201)                         // код успеха - 201
    res.json(newTodo)                       // отправляем эту запись обратно

})

// put - для обновления записей
app.put('/api/todo/:id', (req, res) => {
    const {todo} = stor
    const {title, desc} = req.body          // получаем тело запроса
    const {id} = req.params                 // идентификатор из адресной строки
    const index = todo.findIndex(el => el.id === id)
    
    //если мы находим запись с нужным индексом, то мы ее обновляем
    if(index !== -1){
        todo[index] = {
            ...todo[index],
            title,
            desc,
        }

        res.json(todo[index])
    } else {                                //иначе, мы отправляем код ошибки - 404
        res.status(404)
        res.json('404 | страница не найдена')
    }

})

//delete - удаление записи
app.delete('/api/todo/:id', (req, res) => {
    const {todo} = stor
    const {id} = req.params                 
    const idx = todo.findIndex(el => el.id === id)

    if(idx !== -1){                         // в случае нахождения записи - удалить ее
        todo.splice(idx, 1)
    }else {                                 // в противном случае - вернуть ошибку 404
        res.status(404)
        res.json('404 | страница не найдена')
    }
})


const PORT = process.env.PORT || 7000       // PORT - определенный порт для подключения к сервису
app.listen(PORT) // для прослушивания входящих сообщений