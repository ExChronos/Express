const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/users')
    },
    filename(req, file, cb){
        cb(null, 'db.json')
    }
})

module.exports = multer({storage})