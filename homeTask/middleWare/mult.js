const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/downloadBooks')
    },
    filename(req, file, cb){
        // let name = req.body()
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = multer({storage})