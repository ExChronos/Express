const express = require('express')
const {v4: uuid} = require('uuid')

const router = express.Router()

class Todo {
    constructor (title='', desc='',id=uuid()){
        this.title=title
        this.desc=desc
        this.id=id
    }
};

const stor = {
    todo: [],
};

[1,2,3].map(el => {
    const newTodo = new Todo(`todo ${el}`, `desc todo ${el}`);
    stor.todo.push(newTodo)
});

// вывод всех записей

router.get('/', (req, res) =>{
    const {todo} = stor        // получение значений из store

    res.render('todo/index', {  // передача интересующего нас шаблона из главной папки без точек
        title: 'Todo',          // а также объекты данных
        todos: todo
    })

})

// форма для создания новой записи
router.get('/create', (req, res) =>{
    res.render('todo/create', {
        title: 'Todo | create',
        todo: {},
    })
})
// создание новой записи
router.post('/create', (req, res) =>{
    const {todo} = stor
    const {title, desc} = req.body // берем данные о title & desc из формы записи

    const newTodo = new Todo(title, desc) // создаем новую запись
    todo.push(newTodo) // заталкиваем ее в массив todo
    res.redirect('/todo') // отправляем пользователя на страницу /todo
})

// получение записи по ее id
router.get('/:id', (req, res) =>{
    const {todo} = stor
    const {id} = req.params
    const idx = todo.findIndex(el => el.id === id)

    if(!idx){
        res.redirect('/404')
    }

    res.render('todo/view', {
        title: "todo | view",
        todo: todo[idx]
    })
})


router.get('/update/:id', (req, res) =>{
    const {todo} = stor
    const {id} = req.params
    
    const idx = todo.findIndex(el => el.id === id)

    if(!idx){
        res.redirect('/404')
    }

    res.render('todo/update', {
        title: "todo | update",
        todo: todo[idx]
    })
})
router.post('/update/:id', (req, res) =>{
    const {todo} = stor
    const {id} = req.params
    const {title, desc} = req.body
    
    const idx = todo.findIndex(el => el.id === id)

    if(!idx){
        res.redirect('/404')
    }

    todo[idx] = {
        ...todo[idx],
        title,
        desc
    }
})
router.post('/delete/:id', (req, res) =>{
    const {todo} = stor
    const {id} = req.params
    
    const idx = todo.findIndex(el => el.id === id)

    if(!idx){
        res.redirect('/404')
    }

    todo.splice(idx, 1)
    res.redirect('/todo')
})

module.exports = router