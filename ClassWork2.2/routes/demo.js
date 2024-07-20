const express = require('express')
const router = express.Router()
const fileMulter = require('../middleWare/file')

// ниже - получение запроса по ссылке - upload-img

router.post('/upload-img', 
    fileMulter.single('cover-img'),     //ожидаемое имя файла

    (req, res) => {
        if(req.file){                   // если файл есть
            const {path} = req.file
            res.json({path})            // вернуть файл в качестве ответа
        }
        res.json()
})

module.exports = router