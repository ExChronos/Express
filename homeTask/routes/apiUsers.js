const express = require('express')
const {v4: uuid} = require('uuid')
const User = require('../models/user')

const apiUserRouter = express.Router()


// №1 - получить список всех пользователей
apiUserRouter.get('/', async (req, res) => {
    try {
        const user = await User.find().select('-__v')
        res.json(user)
    } catch (error) {
        res.status(500).json(e)
    }
})

// №2 - зарегистрировать нового пользователя
apiUserRouter.post('/', async (req, res) => {
    const {name, role} = req.body
    const id = uuid()

    const newUser = new User({
        name,
        role,
    })

    try {
        await newUser.save()
        res.json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = apiUserRouter