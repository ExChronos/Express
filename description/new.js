const express = require('express')

const logger = require('./middleware/logger')
const bookRouter = require('./routes/book')
const indexRouter = require('./routes/index')

const app = express()

app.use(logger)
app.use(express.static('./static/html'))
app.use(express.static('./static/ejs'))

app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.use('/home', indexRouter)
app.use('/api/book', bookRouter)

const PORT = process.env.PORT || 7000
app.listen(PORT, console.log(`Server started at: http://localhost:${PORT}`))