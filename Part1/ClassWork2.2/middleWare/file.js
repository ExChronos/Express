// file.js - для конфигурации multer

const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb) {        // куда буду записывать файлы
        cb(null, 'public/img')          // 1й - ошибка, 2й - какая-то директория для записи. Эта директория должна быть в корне проекта
    },
    filename(req, file, cb){            // название записываемого файла
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = multer({storage})