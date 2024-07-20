const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/json')
    },
    filename(req, file, cb){
        
        cb(null, `${Data.now()}-${file.originalname}`)
    }
})

module.exports = multer({storage})