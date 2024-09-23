const express = require('express')
const {v4: uuid} = require('uuid')
const User = require('../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../db')
const path = require('path')

const apiUserRouter = express.Router()

// настраиваем функцию verify
const verify = (username, password, done) => {
    db.users.findByUsername(username, (err, user) => {
        if(err){return done(err)}
        if(!user){return done(null, false)}
        if(!db.users.verifyPassword(user, password)){
            return done(null, false)
        }

        return done(null, user)
    })
}

// инициализируем объект passport
const options = {
    usernameField: "username",
    passwordField: "password"
}

passport.use('local', new LocalStrategy(options, verify))

// сериализуем и десериализуем (представление того, как пользователь будет записан в сессию)
passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    db.users.findById(id, (err, user) => {
        if(err) return cb(err)
        cb(null, user)
    })
})

// №0 - отправка главной страницы
apiUserRouter.get('/', (req, res) => {
    res.render(path.join(__dirname, '..', '/views/user/home'), {
        user: req.user
    })
})

// №1 - регистрация пользователя
apiUserRouter.get('/login', (req, res) => {
    res.render(path.join(__dirname, '..', '/views/user/login'))
})
apiUserRouter.post('/login',
    passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res) => {
        console.log(req.user)   
        res.redirect('/api/user')
    }
)

// №2 - отправка пользователю страницы
apiUserRouter.get('/me', 
    (req, res, next) => {
        if(!req.isAuthenticated()){
            return res.redirect('/api/user')
        }
        next()
    },
    (req, res) => {
        res.render(path.join(__dirname, '..', '/views/user/profile'), {user: req.user})
    }
)

// №3 - выход
apiUserRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        res.redirect('/api/user')
    })
})

module.exports = apiUserRouter