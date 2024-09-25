const express = require('express')
const path = require('path')
const {v4: uuid} = require('uuid')
const User = require('../models/user')

const api_user = express.Router()

api_user.get('/registry', (req, res) => {
    res.render(path.join(__dirname, '..', '/views/user/reg'))
})
api_user.post('/registry', async (req, res) => {
    const {name, email, password, contactPhone} = req.body
    const id = uuid()

    const newUser = User.create({
        _id: id,
        name: name,
        email: email,
        password: password,
        contactPhone: contactPhone
    })

    try {
        await newUser.save()
        res.redirect('/')
    } catch (error) {
        console.error(error)
    }
})

module.exports = api_user