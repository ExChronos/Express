const express = require('express')

const logger = require('./middleWare/logger');
const err404 = require('./middleWare/err-404');
const indexRouter = require('./routes/index');
const demoRouter = require('./routes/demo');

const app = express();

app.use(logger)

app.use('/public', express.static(__dirname+'/public'))     // для того, чтобы отдать файл
app.use('/', indexRouter)
app.use('/demo', demoRouter)

app.use(err404)



const PORT = process.env.PORT || 7000
app.listen(PORT)